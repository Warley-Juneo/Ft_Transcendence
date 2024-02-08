// Aqui vamos colocar nossos serviços,
// que é startgame, updategame, checkcoliissionpaddle e checkcollisionwall.

import { Injectable } from "@nestjs/common";
import { GGame } from "./game.jogo.interfaces";
import { User } from "@prisma/client";

@Injectable()
export class JogoService {
	static rooms: GGame[] = [];
	static  x: number = 0;

	async startGame(player1: String, player2: String, hits_for_acceleration: number) {
		const game = new GGame(player1, player2, hits_for_acceleration);
		JogoService.rooms.push(game);
		return game;
	}

	// Y: acima + / abaixo - X: direita + / esquerda -
	verifyCollisionPaddles(game: GGame) {
		let verifyCollisionPaddleLeft = () => {

			let half_paddle_size = game.paddleLeft.height / 2;
			let half_ball_size = game.ball.size / 2;

			if (game.ball.positionX <= game.paddleLeft.positionX) {

				if ((game.ball.positionY + half_ball_size) < (game.paddleLeft.positionY - half_paddle_size)) {
					game.placarRight++;
					return false
				}
				if ((game.ball.positionY - half_ball_size) > (game.paddleLeft.positionY + half_paddle_size)) {
					game.placarRight++;
					return false
				}

				//Muda direção em X, mudando o sinal do numero
				game.ball.directionX *= -1;
				game.paddle_hits++;

				//Cálculo do ângulo
				if (game.ball.positionY >= game.paddleLeft.positionY) {
					let hit_pos = (game.ball.positionY - game.paddleLeft.positionY) / 1.00;
					let paddle_half_size =game.paddleLeft.height / 2;
					let paddle_hit = ((hit_pos * 100) / paddle_half_size) / 1.00;
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					if (game.ball.angle > game.ball.max_angle) {
						game.ball.angle = game.ball.max_angle;
					}
					game.ball.directionY = -1;

				}
				if (game.ball.positionY < game.paddleLeft.positionY) {

					let hit_pos = (game.paddleLeft.positionY - game.ball.positionY) / 1.00;
					// console.log("hi_pos: ", hit_pos);
					let paddle_half_size =game.paddleLeft.height / 2;
					let paddle_hit = ((hit_pos * 100) / paddle_half_size) / 1.00;
					// console.log("paddle_hit: ", paddle_hit, "\n");
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					if (game.ball.angle > game.ball.max_angle) {
						game.ball.angle = game.ball.max_angle;
					}
					game.ball.directionY = 1;
				}
				game.ball_refX = 0;
				game.ball_refY = 0;
				game.ball.hit_positionY = game.ball.positionY;
			}
			return true;
		}

		let verifyCollisionPaddleRight = () => {
			let half_paddle_size = game.paddleRight.height / 2;
			let half_ball_size = game.ball.size / 2;
			
			if (game.ball.positionX >= game.paddleRight.positionX) {

				if ((game.ball.positionY + half_ball_size) < (game.paddleRight.positionY - half_paddle_size)) {
					game.placarLeft++;
					return false
				}
				if ((game.ball.positionY - half_ball_size) > (game.paddleRight.positionY + half_paddle_size)) {
					game.placarLeft++;
					return false
				}

				//Muda direção em X, mudando o sinal do numero
				game.ball.directionX *= -1;
				game.paddle_hits++;

				//Cálculo do ângulo
				if (game.ball.positionY >= game.paddleRight.positionY) {
					// console.log("padle positionY: ", game.paddleRight.positionY);
					// console.log("ball positionY: ", game.ball.positionY);
					let hit_pos = (game.ball.positionY - game.paddleRight.positionY) / 1.00;
					// console.log("padle hit position: ", hit_pos);
					let paddle_half_size =game.paddleRight.height / 2;
					let paddle_hit = (hit_pos * 100 / paddle_half_size) / 1.00;
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					// console.log("padle hit perc", paddle_hit_perc);
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					// console.log("ball angle", game.ball.angle, "\n\n");
					if (game.ball.angle > game.ball.max_angle) {
						game.ball.angle = game.ball.max_angle;
					}
					game.ball.directionY = -1;
				}
				if (game.ball.positionY < game.paddleRight.positionY) {
					let hit_pos = (game.paddleRight.positionY - game.ball.positionY) / 1.00;
					let paddle_half_size =game.paddleRight.height / 2;
					let paddle_hit = ((hit_pos * 100) / paddle_half_size) / 1.00;
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					if (game.ball.angle > game.ball.max_angle) {
						game.ball.angle = game.ball.max_angle;
					}
					game.ball.directionY = 1;
				}
				game.ball_refX = 0;
				game.ball_refY = 0;
				game.ball.hit_positionY = game.ball.positionY;
			}
			return true;
		}

		if (verifyCollisionPaddleLeft() == false) {
			return false
		}
		if (verifyCollisionPaddleRight() == false) {
			return false
		}
		return true;
	}

	verifyCollisionWall(game: GGame) {
		let verifyCollisionWallUp = () => {
			if (game.ball.positionY <= 0) {
				// game.ball.angle = 180 - game.ball.angle;
				game.ball.directionY *= -1;
				game.ball_refX = game.ball.positionX;
				game.ball_refY = game.ball.positionY;
				game.ball_refX = 0;
				game.ball_refY = 0;
				game.ball.hit_positionY = game.ball.positionY;
				return true;
			}
		}

		let verifyCollisionWallDown = () => {
			if (game.ball.positionY >= game.window.height) {
				// game.ball.angle = 180 - game.ball.angle;
				game.ball.directionY *= -1;
				game.ball_refX = 0;
				game.ball_refY = 0;
				game.ball.hit_positionY = game.ball.positionY;
				return true;
			}
		}

		verifyCollisionWallUp();
		verifyCollisionWallDown();
	}

	moveBall(game: GGame) {
		// game.ball.positionX = game.ball.velocity;
		// game.ball.positionY += game.ball.angle;
	}

	movePaddle(roomID: string, isLeft: boolean, isUp: boolean) {
		let game = JogoService.rooms.find(game => game.roomID == roomID);
		if (isLeft == true) {
			if (isUp == true) {
				game.paddleLeft.positionY -= game.paddleLeft.velocity;
				game.paddleLeft.position_front -= game.paddleLeft.velocity; 
			}
			else {
				game.paddleLeft.positionY += game.paddleLeft.velocity;
				game.paddleLeft.position_front += game.paddleLeft.velocity;
			}
		}
		else {
			if (isUp == true) {
				game.paddleRight.positionY -= game.paddleRight.velocity;
				game.paddleRight.position_front -= game.paddleRight.velocity;
			}
			else {
				game.paddleRight.positionY += game.paddleRight.velocity;
				game.paddleRight.position_front += game.paddleRight.velocity;
			}
		}
	}

	checkScore(game: GGame) {
		if (game.placarLeft == 10 || game.placarRight == 10) {
			return 'left';
		}
		return false;
	}

	checkWinner(game: GGame) {
		if (game.placarLeft == 10) {
			return game.player_left;
		}
		else if (game.placarRight == 10) {
			return game.player_right;
		}
	}

	CheckDisconnectUser(game: GGame, player: User) {
		if (game.player_left.id == player.id) {
			game.player_left.status = false;
			return true;
		} else if (game.player_right.id == player.id) {
			game.player_right.status = false;
			return true;
		}
	}

	resetGame(game: GGame) {
		game.ball.positionX = game.window.width / 2;
		game.ball.positionY = game.window.height / 2;
		game.ball.velocity = 5;
		// game.ball.directionX = Math.random() < 0.5 ? -1 : 1;
		game.ball.directionX = -1;
		game.ball.directionY = 1;
		game.ball.angle = 0;
		game.paddleLeft.positionY = game.window.height / 2;
		game.paddleRight.positionY = game.window.height / 2;
	}

	updateGame(gameID: string) {
		if (JogoService.rooms.length == 0) return;

		let game = JogoService.rooms.find(game => game.roomID == gameID);
		if (this.verifyCollisionPaddles(game) == false) {
			if (this.checkScore(game)) {
				this.checkWinner(game);
			}
			this.resetGame(game);
		}
		else {
			this.verifyCollisionWall(game);
		}
		
		// console.log("ball angle", game.ball.angle);
		// console.log("ball directionX", game.ball.directionX);
		// console.log("ball directionY", game.ball.directionY);
		
		
		if (JogoService.x % 7 == 0) {
			game.ball.positionX += game.ball.path * game.ball.directionX;
			game.ball_refX += game.ball.path;
			JogoService.x = 0;
		}
		JogoService.x++;

		// console.log("ball positionX", game.ball.positionX);
		// console.log("ball refX", game.ball_refX);
		
		if (game.ball.angle != 0) {
			let tan = Math.tan(game.ball.angle);
			// console.log("tangente angle: ", tan);
			game.ball_refY = (game.ball_refX / tan);
			// console.log("ball hitY", game.ball.hit_positionY);
			// console.log("ball refY", game.ball_refY);
			game.ball.positionY = game.ball.hit_positionY + (game.ball_refY * game.ball.directionY);
			// console.log("ball positionY", game.ball.positionY, "\n");
			if (game.ball.positionY > game.window.height) {	
				game.ball.positionY = game.window.height;
			}
			if (game.ball.positionY < 0) {	
				game.ball.positionY = 0;
			}
		}
		if (game.paddleRight.positionY === 300) {
			game.paddleRight.positionY += 40;
		}
		if (game.paddleLeft.positionY === 300) {
			game.paddleLeft.positionY -= 10;
		}
		

		if (game.paddle_hits % game.hits_for_accelaration == 0) {
			game.ball.velocity += game.ball.velocity * (game.ball.acceleration_ratio / 100);
		}

		return game;
	}
}


