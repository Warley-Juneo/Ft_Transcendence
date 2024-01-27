// ### Criar os objetos do nosso game ping pong ###

import { User } from "@prisma/client";
import { randomUUID } from "crypto";


class GWindow {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

class GBall {
  positionX: number;
  positionY: number;
  velocity: number;
  directionX: number;
  directionY: number;
  angle: number;

  constructor(positionX: number, positionY: number, velocity: number, directionX: number, directionY: number ,angle: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocity = velocity;
    this.directionX = directionX;
    this.directionY = directionY;
    this.angle = angle;
  }
}

class Paddle {
  positionY: number;
  positionX: number;
  velocity: number;

  width: number;
  height: number;

  constructor(positionX: number, positionY: number, velocity: number, width: number, height: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
  }
}

class Player {
  user: User;
  status: boolean;

  constructor() {
    this.status = true;
  }
}

export class GGame {
  player1: Player;
  player2: Player;
  placarLeft: number;
  placarRight: number;

  window: GWindow;

  ball: GBall;

  paddleLeft: Paddle;
  paddleRight: Paddle;

  roomID: string;
  winner: string;

  gameStatus: boolean;
  pixelIncrement: number;

  constructor(player1, player2) {
    this.player1.user = player1;
    this.player2.user = player2;
    this.window = new GWindow(800, 600);
    this.ball = new GBall(400, 300, 5, 0, 0, 0);
    this.paddleLeft = new Paddle(0, 50, 5, 0, 20);
    this.paddleRight = new Paddle(100, 50, 5, 5, 20);
    this.roomID = randomUUID();
    this.placarLeft = 0;
    this.placarRight = 0;
    this.winner = "";
    this.pixelIncrement = 5;

    this.paddleLeft.positionX = this.paddleLeft.positionX + this.paddleLeft.width;
    this.paddleRight.positionX = this.paddleRight.positionX - this.paddleRight.width;
    this.ball.directionX = Math.random() < 0.5 ? -1 : 1;
  }
}