import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { JwtMiddleware } from './middleware/auth.middleware';
import { LandingPageModule } from './landing-page/landingPage.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { TFAModule } from './2FA/2FA.module';
import { JogoModule } from './game/jogo/game.jogo.module';
import { GameSocket } from './game/jogo/game.jogo.controllerSocket';
import { JogoService } from './game/jogo/game.jogo.service';
import { GameRepository } from './game/game.repository';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, GameModule, LandingPageModule, ChatroomModule, TFAModule, JogoModule],
  controllers: [],
  providers: [GameSocket, JogoService, PrismaService, GameRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({path: 'auth', method: RequestMethod.POST})
      .forRoutes('*');
      // .exclude('*');
  }
}
