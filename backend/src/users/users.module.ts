import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { HttpModule } from '@nestjs/axios';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
