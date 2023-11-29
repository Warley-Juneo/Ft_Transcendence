// WebSocket for communication chat in real time

import { SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { InputChatroomMessageDto } from "./dto/input.dto";
import { ChatroomService } from "./chatroom.service";

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

  constructor(private readonly service: ChatroomService) {}

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

  @SubscribeMessage('chatroom-message')
    async chatroomMessage(client: Socket, message_dto: InputChatroomMessageDto) {

      let outputMsg = await this.service.createChatroomMessage(message_dto);

	  outputMsg = JSON.stringify(outputMsg);
      console.log("\npublic_chat backend: ", outputMsg + "\n\n");
      client.emit('response', `Backend devolução ${outputMsg}`);
    }
}
