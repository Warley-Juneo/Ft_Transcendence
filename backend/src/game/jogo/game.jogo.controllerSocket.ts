import { SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { User } from "@prisma/client";
import { Socket, Server } from "socket.io";
import { JogoService } from "./game.jogo.service";

type Player = {
	id: string,
	socket: Socket,
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
export class GameSocket {
	constructor(private readonly jogoService: JogoService) { }

	static queues: Player[] = [];
	@WebSocketServer() server: Server;

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(client: Socket, userId: any) {
		//Conversar com Wagraton. Frontend enviando um objet userId, não uma string
		GameSocket.queues.push({ id: userId.id, socket: client });

		if (GameSocket.queues.length >= 2) {
			let player1 = GameSocket.queues[0];
			let player2 = GameSocket.queues[1];
			GameSocket.queues.splice(0, 2);
			const game = await this.jogoService.startGame(player1.id, player2.id, 5);
			player1.socket.join(game.roomID);
			player2.socket.join(game.roomID);
			this.server.to(game.roomID).emit('startGame', game);
		}
	}

	@SubscribeMessage('createMatch')
	async handleCreateMatch(player1: Player, player2: Player) {

		const game = await this.jogoService.startGame(player1.id, player2.id, 5);
		player1.socket.join(game.roomID);
		player2.socket.join(game.roomID);
		this.server.to(game.roomID).emit('startGame', game);
	}

	@SubscribeMessage('leaveRoom')
	async handleLeaveRoom(client: Socket, payload: any) {
		client.leave(payload.room);
	}

	@SubscribeMessage('updateGame')
	async handleUpdateGame(client: Socket, roomID: string) {
		const game = await this.jogoService.updateGame(roomID);
		this.server.to(game?.roomID).emit('updateGame', game);
	}


	@SubscribeMessage('updatePaddle')
	async handleUpdatePaddle(client: Socket, paddle_status: any) {
		// console.log("roomId: ", paddle_status.roomID, "\n isLeft: ", paddle_status.isLeft, "\n isUp: ", paddle_status.isUp);
		const game = await this.jogoService.movePaddle(paddle_status.roomID, paddle_status.isLeft, paddle_status.isUp, paddle_status.pause);
	}
}
