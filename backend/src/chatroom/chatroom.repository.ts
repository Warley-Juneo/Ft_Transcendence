import { Injectable } from "@nestjs/common";
import { CreateChatroomDto } from "./dto/input.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ChatroomRepository {
	constructor(private readonly prisma: PrismaService) {}

	async	create(dto: CreateChatroomDto): Promise<any> {
		let response = this.prisma.chatRoom.create({
			data: {
				
			}
		})
	}
}