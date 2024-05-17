import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  sendMessage(message: any) {
    this.server.emit('newMessage', message);
  }
}
