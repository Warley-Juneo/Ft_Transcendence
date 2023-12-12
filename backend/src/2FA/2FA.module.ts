import { Module } from "@nestjs/common";
import { TwoFactorauthenticationController } from "./2FA.controller";
import { TwoFactorauthenticationService } from "./2FA.service";


@Module({
    imports: [],
    controllers: [ TwoFactorauthenticationController],
    providers: [ TwoFactorauthenticationService],
    exports: [],
})
export class TFAModule {}