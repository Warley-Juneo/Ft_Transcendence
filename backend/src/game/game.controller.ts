import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GameService } from './game.service';
import { UserMatchDto } from './dtos/output.dto';
import { InputUserDto, UploadedFileDto } from './dtos/input.dto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) { }

	@Get('user/match-history')
	async userMatchs(@Query() dto: InputUserDto): Promise<UserMatchDto[]> {
		return await this.gameService.userMatchs(dto);
	}

	@Post('user/photo')
	async userPhoto(dto: UploadedFileDto): Promise<string> {
		console.log(dto.content);
		return await this.gameService.userPhoto(dto.content, dto.nickname);  // Corrigir aqui para passar o arquivo para o serviço
	}

}
