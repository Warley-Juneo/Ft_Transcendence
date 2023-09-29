import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersRepository } from "./users.repository";
import { randomUUID } from "crypto";
import { HttpService } from "@nestjs/axios"; //Make HTTP Requests
import { Observable, last, lastValueFrom } from "rxjs";


@Injectable()
export class UsersService {
    // constructor(private readonly repository: UsersRepository) {}
    constructor(private readonly httpService: HttpService) {}

    async createUser(dto: LoginUserDto): Promise<any> {

        //Validade Dto
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
        
        console.log(userInfoResolved.data.email);

        // var promise = await this.repository.createUser(newUser);
        
        // return promise;
    }
};