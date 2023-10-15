import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from 'src/auth/dtos/input.dtos';
import { User } from '@prisma/client';
import { UserPerfilDto } from 'src/users/dtos/output.dtos';
import { privateDecrypt } from 'crypto';
import { GameService } from 'src/game/game.service';
import { JwtService } from '@nestjs/jwt';
import { OutputLoginDto } from './dtos/output.dtos';
import { JwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly gameService: GameService,
    private readonly jwtService: JwtService,
  ) {}


  async validateUserApi42(authLoginDto: AuthLoginDto): Promise<string> {
    const clientId = process.env.UID;
    const secret = process.env.SECRET;

    const authRequest = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: secret,
      code: authLoginDto.authCode,
      redirect_uri: 'http://localhost:3001', //PAGINA INICIAL
    };

    const authResponsePromise: Observable<any> = this.httpService.post(
      process.env.API42_USER_AUTH,
      authRequest,
    );

    // TRANSFORM FROM OBSERVABLE TO PROMISE
    const authResponseResolved = await lastValueFrom(authResponsePromise);

    //GET ACCESS TOKEN TO ACCESS USER INFORMATION THROUGH 42 API
    const accessToken: string = authResponseResolved.data.access_token;
    
    return accessToken;
  }

  async getUserInfoApi42(accessToken: string): Promise<any> {
    
    const userApiInfo: Observable<any> = this.httpService.get(
      process.env.API42_USER_INFO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  
    // TRANSFORM FROM OBSERVABLE TO PROMISE
    const userApiInfoResolved = await lastValueFrom(userApiInfo);
  
    return userApiInfoResolved.data;
  }

  async mainLogin(authLoginDto: AuthLoginDto): Promise<OutputLoginDto> {
    
    const accessToken: string = await this.validateUserApi42(authLoginDto);
    
    const userInfo = await this.getUserInfoApi42(accessToken);

    // console.log(userApiInfoResolved);

    //Fill AUTH_DTO
    
    // RESOLVE USER
    //CHECK IF ALREADY EXISTS
    const outputLoginDto = new OutputLoginDto();

    outputLoginDto._login = userInfo.login;
    outputLoginDto._email = userInfo.email;
    outputLoginDto._first_name = userInfo.first_name;
    outputLoginDto._last_name = userInfo.last_name;
    outputLoginDto._nickname = userInfo.nickname;
    outputLoginDto._avatar = userInfo.avatar;  
    
    let user: User = await this.usersService.findUser(outputLoginDto._email);
    if (!user) {
      user = await this.usersService.createUser(outputLoginDto);
      }

    //CREATE JWT TOKEN AUTHENTICATION
    const payload = { sub: user.id, username: user.login };
    let jwt_token = await this.jwtService.signAsync(payload, {secret: "paz"});

    outputLoginDto._access_token = jwt_token;

    console.log(outputLoginDto);
    
    return outputLoginDto;
  }
}
