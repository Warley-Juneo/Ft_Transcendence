import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { GameService } from 'src/game/game.service';
import { AuthLoginDto } from 'src/auth/dtos/authLogin.dto';
import { OutputLoginDto } from './dtos/output.dto';
import { UserInfoDto } from './dtos/userInfo.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
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
      redirect_uri: 'http://localhost:3001',
    };

    const authResponsePromise: Observable<any> = this.httpService.post(
      process.env.API42_USER_AUTH,
      authRequest,
    );

    const authResponseResolved = await lastValueFrom(authResponsePromise);
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
  
    const userApiInfoResolved = await lastValueFrom(userApiInfo);
    return userApiInfoResolved.data;
  }

  async verifyUser(userInfo: any): Promise<any> {

    const userInfoDto = new UserInfoDto();
    userInfoDto._login = userInfo.login;
    userInfoDto._email = userInfo.email;
    userInfoDto._first_name = userInfo.first_name;
    userInfoDto._last_name = userInfo.last_name;
    userInfoDto._nickname = userInfo.login;
    userInfoDto._avatar = userInfo.avatar;
    
    let user: User = await this.usersService.findUser(userInfoDto._login);
    if (!user) {
      user = await this.usersService.createUser(userInfoDto);
    }
    return user;
  }

  async jwtSign(user: any): Promise<string> {
    const payload = { sub: user.id, username: user.login };
    let jwt_token = await this.jwtService.signAsync(payload);
    return (jwt_token);
  }

  async mainLogin(authLoginDto: AuthLoginDto): Promise<OutputLoginDto> {

    const accessToken: string = await this.validateUserApi42(authLoginDto);
    const userInfo = await this.getUserInfoApi42(accessToken);
    const user = await this.verifyUser(userInfo);
    let jwt_token = await this.jwtSign(user);

    const outputLoginDto = new OutputLoginDto();
    outputLoginDto._access_token = jwt_token;
    return outputLoginDto;
  }
}
