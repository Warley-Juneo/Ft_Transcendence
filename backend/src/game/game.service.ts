import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { UserMatchDto, UserMatchesDto } from './dtos/output.dto';
import { DisconnectDto, InputUserDto } from './dtos/input.dto';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async userMatchs(dto: InputUserDto): Promise<UserMatchesDto> {
    let matches = await this.gameRepository.userMatchs(dto.user_id);


    let outpuDto = new UserMatchesDto;
    outpuDto.matches = [];

    for(const obj of matches) {
      let match_dto = new UserMatchDto;
      if (dto.user_id == obj.player_1.id) {
		    match_dto.id = obj.id;
        match_dto.opponent = obj.player_2.nickname;
        match_dto.opponent_avatar = obj.player_2.avatar;
        match_dto.opponent_score = obj.score_p2;
        match_dto.my_score = obj.score_p1;
        if (obj.score_p1 == obj.score_p2){
          match_dto.status = "EMPATE";
        }
        else if (obj.score_p1 > obj.score_p2){
          match_dto.status = "VITÓRIA";
        }
        else if (obj.score_p1 < obj.score_p2){
          match_dto.status = "DERROTA";
        }
      }
      else {
        match_dto.id = obj.id;
        match_dto.opponent = obj.player_1.nickname;
        match_dto.opponent_avatar = obj.player_1.avatar;
        match_dto.opponent_score = obj.score_p1;
        match_dto.my_score = obj.score_p2;
        if (obj.score_p1 == obj.score_p2){
          match_dto.status = "EMPATE";
        }
        else if (obj.score_p2 > obj.score_p1){
          match_dto.status = "VITÓRIA";
        }
        else if (obj.score_p2 < obj.score_p1){
          match_dto.status = "DERROTA";
        }
      }
      outpuDto.matches.push(match_dto);
    }
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

  async disconnect(data: DisconnectDto): Promise<void> {
	return this.gameRepository.updateStatusUser(data);
  }
}
