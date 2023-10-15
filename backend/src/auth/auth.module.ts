import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { GameModule } from 'src/game/game.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    GameModule,
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
