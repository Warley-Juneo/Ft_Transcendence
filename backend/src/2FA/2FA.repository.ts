import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TfaRepository {
	constructor(private readonly prisma: PrismaService) { }

	async setSecret(secret: string, userId: string): Promise<void> {
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				tokenTFA: secret
			},
		});
	}

	async getSecret(userId: string): Promise<string> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { tokenTFA: true },
		});
		return user.tokenTFA;
	}
};
