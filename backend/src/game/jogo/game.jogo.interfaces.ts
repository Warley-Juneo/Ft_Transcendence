// ### Criar os objetos do nosso game ping pong ###

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
	directionX: number;
	directionY: number;
	angle: number;
	size: number;
	max_angle: number;
	path: number;
	velocity: number;
	acceleration_ratio: number;
	hit_positionY: number;

	constructor(velocity: number, acceleration_ratio: number) {
		this.positionX = 0;
		this.positionY = 0;
		this.directionX = 1;
		this.directionY = 1;
		this.angle = 0;
		this.size = 4;
		this.max_angle = 70;
		this.path = 5;
		this.velocity = velocity;
		this.acceleration_ratio = acceleration_ratio;
		this.hit_positionY = 0;
	}
}

class Paddle {
	positionY: number;
	positionX: number;
	velocity: number;
	position_front: number;

	width: number;
	height: number;

	constructor(positionX: number, positionY: number, velocity: number, width: number, height: number) {
		this.positionX = positionX;
		this.positionY = positionY;
		this.velocity = velocity;
		this.width = width
		this.height = height;
		this.position_front = positionY + (height / 2);
	}
}

class Player {
	id: String;
	status: boolean;

	constructor(id: String) {
		this.id = id;
		this.status = true;
	}

}

export class GGame {
	player_left: Player;
	player_right: Player;
	placarLeft: number;
	placarRight: number;

	window: GWindow;

	ball: GBall;

	paddleLeft: Paddle;
	paddleRight: Paddle;

	roomID: string;
	winner: string;
	loser: string;

	gameStatus: boolean;
	pixelIncrement: number;
	paddle_hits: number;
	hits_for_accelaration: number;
	ball_refX: number;
	ball_refY: number;

	constructor(player_left, player_right, hits_for_acceleration) {
		this.player_left = new Player(player_left.id);
		this.player_right = new Player(player_right.id);
		this.window = new GWindow(800, 600);
		this.ball = new GBall(5, 12);
		this.paddleLeft = new Paddle(0, 50, 5, 5, 20);
		this.paddleRight = new Paddle(100, 50, 5, 5, 20);
		// this.roomID = randomUUID();
		this.roomID = '123';
		this.placarLeft = 0;
		this.placarRight = 0;
		this.winner = "";
		this.loser = "";
		this.pixelIncrement = 5;
		this.paddle_hits = 0;
		this.hits_for_accelaration = hits_for_acceleration;

		this.paddleLeft.width = (this.paddleLeft.width / 100) * this.window.width;
		this.paddleLeft.height = (this.paddleLeft.height / 100) * this.window.height;
		this.paddleLeft.positionX = this.paddleLeft.width / 2;
		this.paddleLeft.positionY = this.window.height / 2;

		this.paddleRight.width = (this.paddleRight.width / 100) * this.window.width;
		this.paddleRight.height = (this.paddleRight.height / 100) * this.window.height;
		this.paddleRight.positionX = this.window.width - (this.paddleRight.width / 2);
		this.paddleRight.positionY = this.window.height / 2;

		// this.ball.directionX = Math.random() < 0.5 ? -1 : 1;
		this.ball.directionX = 1;
		this.ball.positionX = this.window.width / 2;
		this.ball.positionY = this.window.height / 2;
		this.ball.hit_positionY = this.ball.positionY;
		this.ball.size = (this.ball.size / 100) * this.window.height;
		this.ball_refX = this.ball.positionX;
		this.ball_refY = this.ball.positionY;
	}
}
