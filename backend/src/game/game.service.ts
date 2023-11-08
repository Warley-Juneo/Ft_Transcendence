import { Injectable } from '@nestjs/common';
import { Match } from '@prisma/client';
import { AuthLoginDto } from 'src/auth/dtos/authLogin.dto';
import { MatchHistory } from './entities/match.entity';
import { GameRepository } from './game.repository';
import { userInfo } from 'os';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async userMatchs(userId: string): Promise<Match[]> {
    return this.gameRepository.userMatchs(userId);
  }

  async numberOfUserMatchWins(userId: string): Promise<number> {
    return this.gameRepository.numberOfUserMatchWins(userId);
  }

  async numberOfUserMatchLoses(userId: string): Promise<number> {
    return this.gameRepository.numberOfUserMatchLoses(userId);
  }

  async numberOfUserMatchDraws(userId: string): Promise<number> {
    return this.gameRepository.numberOfUserMatchDraws(userId);
  }

}
