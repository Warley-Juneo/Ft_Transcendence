import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [HttpModule, UsersModule, GameModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
