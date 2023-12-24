import { Module } from "@nestjs/common";
import { TwoFactorauthenticationController } from "./2FA.controller";
import { TwoFactorauthenticationService } from "./2FA.service";
import { TfaRepository } from "./2FA.repository";
import { PrismaService } from "src/database/prisma.service";

@Module({
    imports: [],
    controllers: [ TwoFactorauthenticationController],
    providers: [ TwoFactorauthenticationService, TfaRepository, PrismaService],
    exports: [],
})
export class TFAModule {}
