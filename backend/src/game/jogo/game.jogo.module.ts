import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JogoService } from './game.jogo.service';
import { GameSocket } from './game.jogo.controllerSocket';
import { GameService } from '../game.service';
import { GameRepository } from '../game.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';


@Module({
  imports: [],
  controllers: [],
  providers: [JogoService, PrismaService, GameSocket, GameService, GameRepository, GameSocket, UsersService, UsersRepository],
  exports: [],
})
export class JogoModule {}
