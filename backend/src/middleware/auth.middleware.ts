import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // console.log("Middleware jwtToken: ", req.headers);
    if (authHeader) {
      // const token = authHeader.split(' ')[1]; // Bearer Token
         const token = authHeader;
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          //DEVEMOS UTILIZAR UMA ENV????????
          secret: "paz",
        });
        //ASSIGNING TO REQUEST OBJECT TO HAVE ACCESS IN OUR ROUTE HANDLERS
        req['user'] = payload;
        // console.log("REq.user: ",req['user'])
        // console.log("JWT: ", authHeader)
      } catch (err) {
        return res.status(401).json({ message: 'Token inválido...' });
      }
    } else {
      return res.status(401).json({ message: 'Token não fornecido...' });
    }
    next();
  }
}
