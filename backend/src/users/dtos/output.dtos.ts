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
  _avatar: string; //trocar aqui para o tipo File
}

export class OutputUsersResumeDto {
  users: UserResumeDto[];
}