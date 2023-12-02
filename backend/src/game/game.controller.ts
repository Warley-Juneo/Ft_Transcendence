import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { UserMatchesDto } from './dtos/output.dto';
import { InputUserDto, DisconnectDto } from './dtos/input.dto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get('user/match-history')
	async userMatchs(@Query() dto: InputUserDto): Promise<UserMatchesDto> {
		return await this.gameService.userMatchs(dto);
	}

	@Put('disconnect')
	async disconnect(@Body() data: DisconnectDto ): Promise<void> {
		return await this.gameService.disconnect(data);
	}
}
