import { Module } from '@nestjs/common';
import { LandingPageService } from './landing-page.service';
import { LandingPageController } from './landing-page.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/auth/constants';
import { UsersRepository } from 'src/users/users.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: JwtConstants.secret,
  })],
  controllers: [LandingPageController],
  providers: [LandingPageService, UsersRepository, PrismaService],
})
export class LandingPageModule {}
