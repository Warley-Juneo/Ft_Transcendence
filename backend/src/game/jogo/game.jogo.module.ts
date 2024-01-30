import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JogoService } from './game.jogo.service';
import { GameSocket } from './game.jogo.controllerSocket';


@Module({
  imports: [],
  controllers: [],
  providers: [JogoService, PrismaService, GameSocket],
  exports: [],
})
export class JogoModule {}
