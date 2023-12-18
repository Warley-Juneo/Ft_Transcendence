// WebSocket for communication chat in real time

import { SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { CreateDirectMessageDto, InputChatroomMessageDto } from "./dto/input.dto";
import { ChatroomService } from "./chatroom.service";
import { DisconnectDto } from "src/game/dtos/input.dto";
import { GameService } from "src/game/game.service";

interface queue {
	id: string,
	nickname: string,
	model: string,
	bar: string,
	client: Socket
}

@WebSocketGateway(
	{
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
			credentials: true
		}
	}
)
export class ChatroomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	queue: queue[] = [];

	constructor(private readonly service: ChatroomService
		, private readonly gameService: GameService
	) { }

	@WebSocketServer() server: Server;

	afterInit(server: Server) {
		console.log('Initialized!');
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log("Client connected: ", client.id)
	}

	handleDisconnect(client: Socket) {
		client.emit('desconectado', 'Desconectado com sucesso!');
	}

	@SubscribeMessage('group-message')
	async chatroomMessage(client: Socket, dto: InputChatroomMessageDto) {
		console.log("\n\n\nDTO: ", dto);
		let outputMsg: any = await this.service.createChatroomMessage(dto);
		outputMsg = JSON.stringify(outputMsg);
		this.server.emit('chatMessage', outputMsg);
	}

	@SubscribeMessage('direct-message')
	async directChatroomMessage(client: Socket, dto: CreateDirectMessageDto) {
		let outputMsg: any = await this.service.createDirectMessage(dto);
		outputMsg = JSON.stringify(outputMsg);
		this.server.emit('directChatMessage', outputMsg);
	}

	@SubscribeMessage('check-status')
	async checkStatus(client: Socket, dto: DisconnectDto) {
		await this.gameService.disconnect(dto);
		this.server.emit('checkStatus', 'Desconectado com sucesso!');
	}

	@SubscribeMessage('queueGame')
	async queueGame(client: Socket, dto: queue) {
		if (this.queue.length == 0) {
			this.queue.push(dto);
		}
		else if (this.queue[0].id != dto.id) {
			this.queue.push(dto);
		}
		console.log("\n\n\nDTO: ", dto);
		dto.client = client;
		if (this.queue.length >= 2) {
			let url = this.queue[0].id + this.queue[1].id;
			this.queue[0].client.emit('starGame', url);
			this.queue[1].client.emit('starGame', url);
			this.queue = [];
		}
	}

}
