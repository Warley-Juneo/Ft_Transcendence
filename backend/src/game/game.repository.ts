import { Injectable } from "@nestjs/common";
import { Match } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class GameRepository {
	constructor(private readonly prisma: PrismaService) {}

	async numberOfUserMatchWins(userId: string): Promise<number> {
		var wins = this.prisma.match.count({
			where: {
				winner_id: userId,
			}
		})
		return wins;
	}

	async numberOfUserMatchLoses(userId: string): Promise<number> {
		var loses = this.prisma.match.count({
			where: {
				loser_id: userId,
			}
		})
		return loses;
	}

	async numberOfUserMatchDraws(userId: string): Promise<number> {
		var asPlayer1 = await this.prisma.match.count({
			where: {
				player1_id: userId,
				draw: true,
			}
		})
		var asPlayer2 = await this.prisma.match.count({
			where: {
				player2_id: userId,
				draw: true,
			}
		})
		var loses = asPlayer1 + asPlayer2;

		return loses;
	}
}