import { Controller, Get, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { Match } from '@prisma/client';
import { UserMatchesDto } from './dtos/output.dto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get('user/match-history')
	async userMatchs(@Req() request): Promise<UserMatchesDto> {
		return await this.gameService.userMatchs(request.user.sub);
	}
}
