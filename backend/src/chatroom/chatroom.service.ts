import { Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/input.dto';
import { ChatroomRepository } from './chatroom.repository';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository) {}

	async	create(dto: CreateChatroomDto): Promise<any> {
		let chat = await this.chatroomRepository.create(dto);
	}
}
