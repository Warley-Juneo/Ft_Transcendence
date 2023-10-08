import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { UsersService } from "src/users/users.service";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";
import { User } from "@prisma/client";
import { UserPerfilDto } from "src/users/dtos/output.dtos";
import { privateDecrypt } from "crypto";
import { GameService } from "src/game/game.service";

@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService,
                private readonly usersService: UsersService,
                private readonly gameService: GameService) {}

	async mainLogin(authLoginDto: AuthLoginDto): Promise<UserPerfilDto> {
		const clientId = process.env.UID;
        const secret = process.env.SECRET;

        const authRequest = {
            grant_type: "authorization_code",
            client_id: clientId,
            client_secret: secret,
            code: authLoginDto.authCode,
            redirect_uri: "http://localhost:3001" //PAGINA INICIAL
        }

        const authResponsePromise: Observable<any> = this.httpService
        .post(process.env.API42_USER_AUTH, authRequest);

        // TRANSFORM FROM OBSERVABLE TO PROMISE
        const  authResponseResolved = await lastValueFrom(authResponsePromise);

        //GET ACCESS TOKEN TO ACCESS USER INFORMATION THROUGH 42 API
        const accessToken: String = authResponseResolved.data.access_token;


        const userApiInfo: Observable<any> = this.httpService
        .get(process.env.API42_USER_INFO, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // TRANSFORM FROM OBSERVABLE TO PROMISE
        const  userApiInfoResolved = await lastValueFrom(userApiInfo);

        //Fill AUTH_DTO
        authLoginDto.login = userApiInfoResolved.data.login;
        authLoginDto.email = userApiInfoResolved.data.email;
        authLoginDto.first_name = userApiInfoResolved.data.first_name;
        authLoginDto.last_name = userApiInfoResolved.data.last_name;
        authLoginDto.nickname = userApiInfoResolved.data.login; //must be unique
        authLoginDto.avatar = userApiInfoResolved.data.avatar;
        
        // RESOLVE USER
        let user = await this.usersService.login(authLoginDto);
        
        //CREATE USER_LOGIN_DTO
        const userLoginDto = new UserPerfilDto();
        userLoginDto._login = user.login;
        userLoginDto._email = user.email;
        userLoginDto._first_name = user.first_name;
        userLoginDto._last_name = user.last_name;
        userLoginDto._nickname = user.nickname;
        userLoginDto._avatar = user.avatar;
        userLoginDto._wins = await this.gameService.numberOfUserMatchWins(user.id);
        userLoginDto._loses = await this.gameService.numberOfUserMatchLoses(user.id);
        userLoginDto._draws = await this.gameService.numberOfUserMatchDraws(user.id);
        
        console.log(userLoginDto);
        return userLoginDto;
	}
}