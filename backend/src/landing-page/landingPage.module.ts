import { Module } from '@nestjs/common';
import { LandingPageService } from './landingPage.service';
import { LandingPageController } from './landingPage.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/auth/constants';
import { UsersRepository } from 'src/users/users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { GameService } from 'src/game/game.service';
import { GameModule } from 'src/game/game.module';
import { GameRepository } from 'src/game/game.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [GameModule, JwtModule.register({
    global: true,
    secret: JwtConstants.secret,
  })],
  controllers: [LandingPageController],
  providers: [LandingPageService, UsersService, UsersRepository, PrismaService, GameRepository],
})
export class LandingPageModule {}
