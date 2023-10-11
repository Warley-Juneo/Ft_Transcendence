import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { JwtMiddleware } from './auth/auth.middleware';


@Module({
  imports: [UsersModule, AuthModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(JwtMiddleware)
        // .exclude({path: 'auth', method: RequestMethod.POST})
        // .forRoutes('*');
        .exclude('*');
    }
}

