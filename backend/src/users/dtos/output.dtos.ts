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
}

export class OutputUsersResumeDto {
  users: UserResumeDto[];
}

export class UserMatchesDto {
  opponent:        string;
  opponent_avatar: string;
  opponent_score:  number;
  my_score:        number;
  status:          string
}

export class OutputUserMatchesDto {
  users: UserMatchesDto[];
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