import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginUserDto } from "src/dtos/user.dtos";

@Controller('login')
export class LoginController {

	constructor(private readonly service: LoginService) {}

	@Post()
	async login(@Body() code: LoginUserDto): Promise<any> {
		return await this.service.mainLogin(code)
	}
}