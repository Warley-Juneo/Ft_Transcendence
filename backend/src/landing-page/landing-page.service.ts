import { Injectable, Req } from '@nestjs/common';
import { CreateLandingPageDto } from './dto/create-landing-page.dto';
import { UpdateLandingPageDto } from './dto/update-landing-page.dto';
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
              private readonly userService: UsersRepository) {}

  async landingPage(@Req() request): Promise<void>{

    let jwt = this.jwtService.decode(request.headers.autorization);
    //GET JWT INFORMATION

    console.log("landingPage", jwt);

  }
}
