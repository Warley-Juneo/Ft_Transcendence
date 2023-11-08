import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { GameService } from 'src/game/game.service';
import { GameRepository } from 'src/game/game.repository';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository, GameService, GameRepository],
  exports: [UsersService],
})
export class UsersModule {}
