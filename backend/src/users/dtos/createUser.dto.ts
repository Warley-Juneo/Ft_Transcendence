export class CreateUserDto {
	login: string;
	email: string;
  
	first_name: string;
	last_name: string;
	nickname: string;
	avatar: string; //trocar aqui para o tipo File
}