// WebSocket for communication chat in real time

import { SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

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

  @SubscribeMessage('public_chat')
    async publicChat(client: Socket, message: string) {

      // salva no banco de dados
      // devolve a mensagem
      console.log("public_chat backend: ", message);
      client.emit('response', `Backend devolução ${message}`);
    }
}