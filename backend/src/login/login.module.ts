import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule {}
