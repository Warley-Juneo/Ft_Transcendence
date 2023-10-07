import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";
import { UserLoginDto } from "src/users/dtos/output.dtos";

@Controller('auth')
export class AuthController {

	constructor(private readonly service: AuthService) {}

	@Post()
	async mainLogin(@Body() code: AuthLoginDto): Promise<UserLoginDto> {
		return await this.service.mainLogin(code)
	}
}