import { Controller, Get, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { UserMatchDto } from './dtos/output.dto';
import { InputUserDto } from './dtos/input.dto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get('user/match-history')
	async userMatchs(@Query() dto: InputUserDto): Promise<UserMatchDto[]> {
		return await this.gameService.userMatchs(dto);
	}
}
