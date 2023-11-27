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
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, GameModule, LandingPageModule, ChatroomModule, ConfigModule.forRoot({isGlobal: true,})],
  controllers: [],
  providers: [],
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
