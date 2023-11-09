import { Match } from '@prisma/client';

export class UserProfileDto {
  _login: string;
  _email: string;

  _first_name: string;
  _last_name: string;
  _nickname: string;
  _avatar: string; //trocar aqui para o tipo File

  _wins: number;
  _loses: number;
  _draws: number;
  _ladder: number;
  // _statusConnection?:  boolean; // podemos colocar um enum aqui para ter mais status de conexão
}

export class UserResumeDto {
  _id: string;
  _nickname: string;
  _avatar: string;
  _is_active: boolean;
}

export class OutputUsersResumeDto {
  users: UserResumeDto[];
}

export class UserMatchesDto {
  _opponent:        string;
  _opponent_avatar: string;
  _opponent_score:  number;
  _my_score:        number;
  _status:          string
}

export class OutputUserMatchesDto {
  users: UserMatchesDto[];
}

export class UserLadderDto {
  _avatar:    string;
  _nickname:  string;

  points:     number;
  _matches:   number;
  _wins:      number;
  _loses:     number;
  _draws:     number;
  _ladder:    number;
}

export class OutputLadderDto {
  ladder: UserLadderDto[]; 
}