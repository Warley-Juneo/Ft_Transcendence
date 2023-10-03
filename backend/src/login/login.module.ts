import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';
import { LoginController } from './login.controller';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
