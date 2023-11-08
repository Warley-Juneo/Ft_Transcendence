import { Controller, Get, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { Match } from '@prisma/client';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get('user/match_history')
	async userMatchs(@Req() request): Promise<Match[]> {
		return this.gameService.userMatchs(request.user.sub);
	}
}
