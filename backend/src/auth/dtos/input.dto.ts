import { IsString, IsNotEmpty, ValidateIf } from "class-validator";

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  authCode: string;
}

export class OtherLoginDto {
  @IsString()
  login: string;
  @IsString()
  email: string;
  @IsString()
  nickname: string;
  @ValidateIf(o => o.first_name != null)
  @IsString()
  first_name: string;
  
  @ValidateIf(o => o.last_name != null)
  @IsString()
  last_name: string;
  
  @ValidateIf(o => o.avatar != null)
  @IsString()
  avatar: string;
  }