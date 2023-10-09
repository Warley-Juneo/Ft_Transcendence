import { Injectable } from "@nestjs/common";
import { Match } from "@prisma/client";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";
import { UserEntity } from "src/users/user.entity";
import { MatchHistory } from "./entities/match.entity";
import { GameRepository } from "./game.repository";
import { userInfo } from "os";
import { UserPerfilDto } from "src/users/dtos/output.dtos";

@Injectable()
export class GameService {
	constructor(private readonly gameRepository: GameRepository) {}

	async numberOfUserMatchs(userId: string): Promise<Match[]> {
		return this.gameRepository.numberOfUserMatchs(userId)
	}

	async numberOfUserMatchWins(userId: string): Promise<number> {
		
		return this.gameRepository.numberOfUserMatchWins(userId);
	}

	async numberOfUserMatchLoses(userId: string): Promise<number> {
		
		return this.gameRepository.numberOfUserMatchLoses(userId);
	}

	async numberOfUserMatchDraws(userId: string): Promise<number> {
		
		return this.gameRepository.numberOfUserMatchDraws(userId);
	}

	async userLadder(userLogin: string): Promise<number> {
		
		return this.gameRepository.userLadder(userLogin);
	}
}