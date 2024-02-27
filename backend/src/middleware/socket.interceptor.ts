import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class UsernameInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient<Socket>();
    console.log("socketIDXXXXX: ",client.id);
    const username = "Alguém";/* Obtenha o username do cliente de alguma forma */
    client['username'] = username;
    return next.handle();
  }
}

