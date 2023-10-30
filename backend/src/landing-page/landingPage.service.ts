import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from 'src/users/users.service';
import { OutputLandinPageDto } from './dto/output.dto';
import { GameService } from 'src/game/game.service';

@Injectable()
export class LandingPageService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly gameService: GameService,
  ) {}

  async landingPage(username: string): Promise<OutputLandinPageDto> {

    let user = await this.userService.findUser(username);

    let response = new OutputLandinPageDto();
    response._nickname = user.nickname;
    response._avatar = user.avatar;
    // response._friend_list = user.friend_list;

    console.log('LANDINGPAGE USER: ', response);

    return response;
  }
}
