import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';
import { access } from 'fs';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from 'src/users/users.repository';
import { JwtConstants } from 'src/auth/constants';

@Injectable()
export class LandingPageService {
  constructor(private readonly jwtService: JwtService,
              private readonly prisma: PrismaService,
              private readonly userRepository: UsersRepository) {}

  async landingPage(email: string): Promise<void>{

    // let jwt = this.jwtService.decode(request.headers.autorization);
    //GET JWT INFORMATION

    let user = this.userRepository.findUser(email);
    console.log("USER: ", user);

  }
}
