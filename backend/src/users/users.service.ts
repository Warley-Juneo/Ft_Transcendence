import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersRepository } from "./users.repository";
import { randomUUID } from "crypto";
import { HttpService } from "@nestjs/axios"; //Make HTTP Requests
import { Observable, last, lastValueFrom } from "rxjs";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        private readonly httpService: HttpService,
        private readonly userRepository: UsersRepository) {}

    async createUser(dto: LoginUserDto): Promise<any> {

        const clientId = process.env.UID;
        const secret = process.env.SECRET;

        const authRequest = {
            grant_type: "authorization_code",
            client_id: clientId,
            client_secret: secret,
            code: dto.authCode,
            redirect_uri: "http://localhost:3000"
        }

        const authResponsePromise: Observable<any> = this.httpService
        .post(process.env.API42_USER_AUTH, authRequest);

        // TRANSFORM FROM OBSERVABLE TO PROMISE
        const  authResponseResolved = await lastValueFrom(authResponsePromise);

        //GET ACCESS TOKEN TO ACCESS USER INFORMATION THROUGH 42 API
        const accessToken: String = authResponseResolved.data.access_token;

        const userInfo: Observable<any> = this.httpService
        .get(process.env.API42_USER_INFO, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // TRANSFORM FROM OBSERVABLE TO PROMISE
        const  userInfoResolved = await lastValueFrom(userInfo);

        //CHECK IF ALREADY EXISTS
        var promise: User = await this.userRepository.findUser(userInfoResolved.data.email);
        console.log(promise);
        if (!promise)
        {
            // SET USER_ENTITY
            const newUser = new UserEntity();
            newUser.login = userInfoResolved.data.login,
            newUser.email = userInfoResolved.data.email,
            newUser.nickname = userInfoResolved.data.usual_full_name,
            // console.log(newUser);
            promise = await this.userRepository.createUser(newUser);
        }
        else {
            console.log("USER ALREADY EXISTS")
            promise = await this.userRepository.findUser(userInfoResolved.data.email)
        }
        return promise;
    }
};