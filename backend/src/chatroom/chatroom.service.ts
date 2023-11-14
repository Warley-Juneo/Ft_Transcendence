import { Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/input.dto';

@Injectable()
export class ChatroomService {

	async	create(dto: CreateChatroomDto): Promise<any> {
		
	}
}
