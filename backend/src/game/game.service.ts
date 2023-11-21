import { Injectable } from '@nestjs/common';
import { Match } from '@prisma/client';
import { AuthLoginDto } from 'src/auth/dtos/authLogin.dto';
import { MatchHistory } from './entities/match.entity';
import { GameRepository } from './game.repository';
import { userInfo } from 'os';
import { UserMatchDto, UserMatchesDto } from './dtos/output.dto';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async userMatchs(userId: string): Promise<UserMatchesDto> {
    console.log("UserID_Matchs:", userId);
    let matches = await this.gameRepository.userMatchs(userId);
    
    console.log("User_Matchs:", matches);

    let outpuDto = new UserMatchesDto;
    outpuDto.matches = [];

    for(const obj of matches) {
      let dto = new UserMatchDto;
      if (userId == obj.player_1.id) {
        dto.opponent = obj.player_2.nickname;
        dto.opponent_avatar = obj.player_2.avatar;
        dto.opponent_score = obj.score_p2;
        dto.my_score = obj.score_p1;
        if (obj.score_p1 == obj.score_p2){
          dto.status = "DRAW";
        }
        else if (obj.score_p1 > obj.score_p2){
          dto.status = "WINNER";
        }
        else if (obj.score_p1 < obj.score_p2){
          dto.status = "LOSER";
        }
      }
      else {
        dto.opponent = obj.player_1.nickname;
        dto.opponent_avatar = obj.player_1.avatar;
        dto.opponent_score = obj.score_p1;
        dto.my_score = obj.score_p2;
        if (obj.score_p1 == obj.score_p2){
          dto.status = "DRAW";
        }
        else if (obj.score_p2 > obj.score_p1){
          dto.status = "WINNER";
        }
        else if (obj.score_p2 < obj.score_p1){
          dto.status = "LOSER";
        }
      }
      outpuDto.matches.push(dto);
    }
    console.log("MAches: ", outpuDto);
    return outpuDto;
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
