import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";



@Injectable()
export class repositorySecretTFA {
    constructor (private readonly prisma: PrismaService) {}

    async getSecretTFA(userId: string): Promise<any> {
        let secret = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                secret_tfa: true,
            }
        });

        return secret;
    }

    async setSecretTFA(userId: string, secret: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                secret_tfa: secret,
            },
            select: {
                secret_tfa: true,
            }
        });
    }

    async enableTFA(userId: string, bool: boolean): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                eanble_tfa: bool,
            },
        });
    }
}