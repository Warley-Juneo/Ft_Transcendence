import { Controller, Get } from "@nestjs/common";
import { TwoFactorauthenticationService } from "./2FA.service";


@Controller('2FA')
export class TwoFactorauthenticationController {
    constructor (
        private readonly TwoFactorauthenticationService: TwoFactorauthenticationService,
    ) {}
    
    @Get()
    generateTwoFactorAuthenticationSecret() {
        return this.TwoFactorauthenticationService.generateQRCode();
    }
}
