import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from 'src/auth/dtos/input.dtos';
import { User } from '@prisma/client';
import { GameService } from 'src/game/game.service';
import { JwtService } from '@nestjs/jwt';
import { OutputLoginDto } from './dtos/output.dtos';

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

  async mainLogin(authLoginDto: AuthLoginDto): Promise<OutputLoginDto> {
    
    const accessToken: string = await this.validateUserApi42(authLoginDto);
    const userInfo = await this.getUserInfoApi42(accessToken);

    const outputLoginDto = new OutputLoginDto();
    outputLoginDto._login = userInfo.login;
    outputLoginDto._email = userInfo.email;
    outputLoginDto._first_name = userInfo.first_name;
    outputLoginDto._last_name = userInfo.last_name;
    outputLoginDto._nickname = userInfo.login;
    outputLoginDto._avatar = userInfo.avatar;  
    
    let user: User = await this.usersService.findUser(outputLoginDto._login);
    if (!user) {
      user = await this.usersService.createUser(outputLoginDto);
    }

    const payload = { sub: user.id, username: user.login };
    let jwt_token = await this.jwtService.signAsync(payload);

    outputLoginDto._access_token = jwt_token;
    return outputLoginDto;
  }
}
