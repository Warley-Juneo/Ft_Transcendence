import { IsString, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  authCode: string;
}
