import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  authCode: string;
}
