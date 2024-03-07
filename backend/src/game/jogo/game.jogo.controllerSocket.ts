// import { SubscribeMessage, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import { Socket, Server } from "socket.io";
// import { JogoService } from "./game.jogo.service";
// import { UsersService } from "src/users/users.service";

// type Player = {
// 	id: string,
// 	socket: Socket,
// }

// @WebSocketGateway(
// 	{
// 		cors: {
// 			origin: '*',
// 			methods: ['GET', 'POST'],
// 			credentials: true
// 		}
// 	}
// )
// export class GameSocket {
// 	matchs: {
// 		[key: string]: Player;
// 	} = {};

// 	constructor(private readonly jogoService: JogoService,
// 		private readonly userService: UsersService) { }

// 	static queues: Player[] = [];
// 	@WebSocketServer() server: Server;

// 	@SubscribeMessage('joinRoom')
// 	async handleJoinRoom(client: Socket, userId: any) {
// 		//Conversar com Wagraton. Frontend enviando um objet userId, não uma string
// 		GameSocket.queues.push({ id: userId.id, socket: client });

// 		if (GameSocket.queues.length >= 2) {
// 			let player1 = GameSocket.queues[0];
// 			let player2 = GameSocket.queues[1];
// 			GameSocket.queues.splice(0, 2);
// 			const game = await this.jogoService.startGame(player1.id, player2.id, 5);
// 			player1.socket.join(game.roomID);
// 			player2.socket.join(game.roomID);
// 			this.server.to(game.roomID).emit('startGame', game);
// 			this.server.emit('checkStatus', '');
// 		}
// 	}

// 	@SubscribeMessage('createMatch')
// 	async handleCreateMatch(player1: Player, player2: Player) {
// 		// console.log("Create Match: \nplayer1: ", player1.id, "\nplayer2: ", player2.id );
// 		const game = await this.jogoService.startGame(player1.id, player2.id, 5);
// 		console.log("GAME HandleCreate MAtch: ", game);
// 		player1.socket.join(game?.roomID);
// 		player2.socket.join(game?.roomID);
// 		this.server.to(game?.roomID).emit('startGame', game);
// 		this.server.emit('checkStatus', '');
// 	}

// 	@SubscribeMessage('disconnectUser')
// 	async handleDisconnectUser(client: Socket, dto: any): Promise<any> {
// 		const game = await this.jogoService.disconnectUser(dto.roomID, dto.isLeft);
// 		this.server.to(game?.roomID).emit("updateGame", game);
// 	}

// 	@SubscribeMessage('updateGame')
// 	async handleUpdateGame(client: Socket, roomID: string) {
// 		const game = await this.jogoService.updateGame(roomID);
// 		if (game && game.winner) {
// 			this.server.emit('checkStatus', '');
// 		}
// 		this.server.to(game?.roomID).emit('updateGame', game);
// 	}

// 	@SubscribeMessage('updatePaddle')
// 	async handleUpdatePaddle(client: Socket, paddle_status: any) {
// 		// console.log("roomId: ", paddle_status.roomID, "\n isLeft: ", paddle_status.isLeft, "\n isUp: ", paddle_status.isUp);
// 		const game = await this.jogoService.movePaddle(paddle_status.roomID, paddle_status.isLeft, paddle_status.isUp, paddle_status.pause);
// 	}

// 	@SubscribeMessage('watch-match')
// 	async handleWatchMatch(client: Socket, ids: { playerId: string, watcherId: string }) {
// 		let game = await this.jogoService.watchMatch(ids.playerId, ids.watcherId);
// 		client.join(game.roomID);
// 		client.emit('startGame', game);
// 		this.server.emit('checkStatus', '');
// 	}

// 	@SubscribeMessage('sendInvite')
// 	async sendInvite(client: Socket, obj: { myId: string, myNickname: string, otherId: string,  msg: string }) {
// 		if (obj.msg == "convite") {
// 			this.matchs[obj.otherId] = { id: obj.myId, socket: client };
// 			this.server.emit('receiveConvite', obj);
// 		}
// 		else if (obj.msg == "response") {
// 			let player1: Player = {id : obj.myId, socket: client}
// 			let player2: Player = this.matchs[obj.myId];
// 			// console.log('player1: ', player1.id, " socket id: ", player1.socket.id);
// 			// console.log('player2: ', player2.id, " socket id: ", player2.socket.id);
// 			this.handleCreateMatch(player1, player2)
// 		}
// 	}

// }
