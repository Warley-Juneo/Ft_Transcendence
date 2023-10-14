import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';
import { access } from 'fs';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtConstants } from 'src/auth/constants';
import { OutputLandinPageDto } from './dto/output.dto';
import { LandingPageDto } from './dto/input.dto';
import { GameService } from 'src/game/game.service';

@Injectable()
export class LandingPageService {
  constructor(private readonly jwtService: JwtService,
              private readonly prisma: PrismaService,
              private readonly userService: UsersService,
              private readonly gameService: GameService) {}

  async landingPage(dto: LandingPageDto): Promise<OutputLandinPageDto>{

    // let jwt = this.jwtService.decode(request.headers.autorization);
    //GET JWT INFORMATION

    let user = await this.userService.findUser(dto.jwt_auth);
    
    
    let response = new OutputLandinPageDto();
    response._login = user.login;
    response._email = user.email;
    response._first_name = user.first_name;
    response._last_name = user.last_name;
    response._nickname = user.nickname;
    response._wins = await this.gameService.numberOfUserMatchWins(user.email);
    response._loses = await this.gameService.numberOfUserMatchLoses(user.email);
    response._draws = await this.gameService.numberOfUserMatchDraws(user.email);
    response._ladder = await this.gameService.userLadder(user.login);
    
    console.log("LANDINGPAGE USER: ", response);
    
    return response;

  }
}
