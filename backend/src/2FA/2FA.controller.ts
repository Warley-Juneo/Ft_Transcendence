import { Controller, Get, Post, Req, Body } from "@nestjs/common";
import { TwoFactorauthenticationService } from "./2FA.service";
import { get } from "http";


@Controller('2FA')
export class TwoFactorauthenticationController {
    constructor (
        private readonly TwoFactorauthenticationService: TwoFactorauthenticationService,
    ) {}

    @Get()
    generateTwoFactorAuthenticationSecret(@Req() request) {
        return this.TwoFactorauthenticationService.generateQRCode(request.user.sub);
    }

	@Post('validate')
	validateTwoFactorAuthenticationCode(@Req() request, @Body() token: string) {
		return this.TwoFactorauthenticationService.verifyTwoFactorAuthenticationToken(token['token'], request.user.sub);
	}

	@Post('clear')
	clearTwoFactorAuthenticationSecret(@Req() request) {
		console.log("HAHA");
		return this.TwoFactorauthenticationService.clearTwoFactorAuthenticationSecret(request.user.sub);
	}

	@Get('verifyStatus')
	verifyStatus(@Req() request) {
		return this.TwoFactorauthenticationService.verifyStatus(request.user.sub);
	}
}
