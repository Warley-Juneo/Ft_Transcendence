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

    let user = await this.userService.findUserAuth(username);

    let response = new OutputLandinPageDto(user);
    return response;
  }
}
