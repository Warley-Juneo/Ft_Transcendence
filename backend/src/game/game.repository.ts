import { Injectable } from "@nestjs/common";
import { Ladder, Match } from "@prisma/client";
import e from "express";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class GameRepository {
	constructor(private readonly prisma: PrismaService) {}

	async numberOfUserMatchs(userId: string): Promise<Match[]> {
		let asPalyer1 = this.prisma.match.findMany({
			where: {
				player1_id: userId
			}
		})
		let asPalyer2 = this.prisma.match.findMany({
			where: {
				player2_id: userId
			}
		})
		let matchs = asPalyer1;
		return matchs;
	}

	async numberOfUserMatchWins(userId: string): Promise<number> {
		let wins = await this.prisma.match.count({
			where: {
				winner_id: userId
			}
		})
		return wins;
	}

	async numberOfUserMatchLoses(userId: string): Promise<number> {
		let loses = await this.prisma.match.count({
			where: {
				loser_id: userId
			}
		})
		return loses;
	}

	async numberOfUserMatchDraws(userId: string): Promise<number> {
		let as_Player1 = await this.prisma.match.count({
			where: {
				player1_id: userId
			},
			select: {
				draws: true,
			}
		})
		let as_Player2 = await this.prisma.match.count({
			where: {
				player2_id: userId
			},
			select: {
				draws: true,
			}
		})
		let response = as_Player1.draws + as_Player2.draws;
		return response;
	}

	async defineLadder() {

	}
	
	async ladder(): Promise<Ladder[]> {
		let ladder = await this.prisma.ladder.findMany({
			orderBy: [
				{
					points: 'asc'
				},
			]
		});
		return ladder;
	}
	
	async userLadder(userLogin: string): Promise<number> {
		let ladder = await this.ladder();
		console.log(ladder);
		let response = ladder.findIndex(item => item.player_name === userLogin);
		response = response + 1;
		return response;
	}
}