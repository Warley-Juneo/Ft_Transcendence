import { Injectable } from "@nestjs/common";
import { Match } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class GameRepository {
	constructor(private readonly prisma: PrismaService) {}

	async numberOfMatchWins(userId: string): Promise<number> {
		var wins = this.prisma.match.count({
			where: {
				winner_id: userId,
				}
		})
		return wins;
	}

	async numberOfMatchLoses(userId: string): Promise<number> {
		var loses = this.prisma.match.count({
			where: {
				loser_id: userId,
				}
		})
		return loses;
	}
}