import { SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { User } from "@prisma/client";
import { Socket, Server } from "socket.io";
import { JogoService } from "./game.jogo.service";

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
  constructor(private readonly jogoService: JogoService) {}

  static queues: User[] = [];
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, user: User) {
    GameSocket.queues.push(user)
    
    if (GameSocket.queues.length >= 2) {
      let player1 = GameSocket.queues[0];
      let player2 = GameSocket.queues[1];
      GameSocket.queues.splice(0, 2);
      const game = await this.jogoService.startGame(player1, player2);
      client.to(game.roomID).emit('joinRoom', game);
    } else {
      client.join('Você entrou na fila!');
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, payload: any) {
    client.leave(payload.room);
  }

  @SubscribeMessage('updateGame')
  async handleUpdateGame(client: Socket, roomID: string) {
    const game = await this.jogoService.updateGame(roomID);
    client.to(game.roomID).emit('updateGame', game);
  }
 
  
}