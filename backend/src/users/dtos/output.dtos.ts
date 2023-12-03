import { Match } from '@prisma/client';

export class UserProfileDto {
  login: string;
  email: string;

  first_name: string;
  last_name: string;
  nickname: string;
  avatar: string; //trocar aqui para o tipo File

  wins: number;
  loses: number;
  draws: number;
  ladder: number;
  // _statusConnection?:  boolean; // podemos colocar um enum aqui para ter mais status de conexão
}

export class UserResumeDto {
  id: string;
  nickname: string;
  avatar: string;
  is_active: boolean;

  constructor(obj: any) {
	this.id = obj.id;
	this.nickname = obj.nickname;
	this.avatar = obj.avatar;
	this.is_active = obj.is_active;
  }
}

export class UserMatchesDto {
  opponent:        string;
  opponent_avatar: string;
  opponent_score:  number;
  my_score:        number;
  status:          string;

  constructor(obj: any) {
	this.opponent = obj.player_2.nickname;
    this.opponent_avatar = obj.player_2.avatar;
    this.opponent_score = obj.score_p2;
    this.my_score = obj.score_p1;

    if (obj.draws == true){
      this.status = "DRAW";
    }
	else {
		this.opponent_score < this.my_score ? this.status = "WINNER" : this.status = "LOSER";
	}
  }
}

export class UserLadderDto {
  id:        string;
  avatar:    string;
  nickname:  string;

  points:     number;
  matches:   number;
  wins:      number;
  loses:     number;
  draws:     number;
  ladder:    number;
}

export class OutputLadderDto {
  ladder: UserLadderDto[];
}
