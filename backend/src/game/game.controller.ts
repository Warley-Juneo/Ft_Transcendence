import { Controller, Get, Query, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { Match } from '@prisma/client';
import { UserMatchesDto } from './dtos/output.dto';
import { InputUserDto } from './dtos/input.dto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get('user/match-history')
	async userMatchs(@Query() dto: InputUserDto): Promise<UserMatchesDto> {
		return await this.gameService.userMatchs(dto);
	}
}
