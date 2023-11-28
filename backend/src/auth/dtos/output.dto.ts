import { IsNotEmpty } from "class-validator";

export class OutputLoginDto {
  @IsNotEmpty()
  _access_token: string;
}
