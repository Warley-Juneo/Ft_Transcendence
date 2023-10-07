import { Injectable } from "@nestjs/common";
import { Match } from "@prisma/client";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";
import { UserEntity } from "src/users/user.entity";
import { MatchHistory } from "./entities/match.entity";
import { GameRepository } from "./game.repository";

@Injectable()
export class GameService {
	constructor(private readonly gameRepository: GameRepository) {}

	async numberOfUserMatchWins(email: string): Promise<number> {
		
		return this.gameRepository.numberOfUserMatchWins(email);
	}

	async numberOfUserMatchLoses(email: string): Promise<number> {
		
		return this.gameRepository.numberOfUserMatchLoses(email);
	}

	async numberOfUserMatchDraws(email: string): Promise<number> {
		
		return this.gameRepository.numberOfUserMatchDraws(email);
	}
}