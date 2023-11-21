import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
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
		dto.id = obj.id;
        dto.opponent = obj.player_2.nickname;
        dto.opponent_avatar = obj.player_2.avatar;
        dto.opponent_score = obj.score_p2;
        dto.my_score = obj.score_p1;
        if (obj.score_p1 == obj.score_p2){
			dto.status = "EMPATE";
        }
        else if (obj.score_p1 > obj.score_p2){
          dto.status = "VITÓRIA";
        }
        else if (obj.score_p1 < obj.score_p2){
          dto.status = "DERROTA";
        }
      }
      else {
		dto.id = obj.id;
        dto.opponent = obj.player_1.nickname;
        dto.opponent_avatar = obj.player_1.avatar;
        dto.opponent_score = obj.score_p1;
        dto.my_score = obj.score_p2;
        if (obj.score_p1 == obj.score_p2){
          dto.status = "EMPATE";
        }
        else if (obj.score_p2 > obj.score_p1){
          dto.status = "VITÓRIA";
        }
        else if (obj.score_p2 < obj.score_p1){
          dto.status = "DERROTA";
        }
      }
      outpuDto.matches.push(dto);
    }
    console.log("\n\n\n\nMAches: ", outpuDto);
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
