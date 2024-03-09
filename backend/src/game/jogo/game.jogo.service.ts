// Aqui vamos colocar nossos serviços,
// que é startgame, updategame, checkcoliissionpaddle e checkcollisionwall.

import { Injectable } from "@nestjs/common";
import { GGame } from "./game.jogo.interfaces";
import { MatchDto } from "../dtos/input.dto";
import { GameRepository } from "../game.repository";
import { AumentarPaddle, DiminuirPaddle } from "./game.jogo.interfaces";
import { last } from "rxjs";

@Injectable()
export class JogoService {

	constructor(private readonly gameRepository: GameRepository) { };
	static rooms: GGame[] = [];
	static x: number = 0;

	async startGame(player1_id: string, player2_id: string, hits_for_acceleration: number) {

		if (JogoService.rooms.length != 0) {

			let check = JogoService.rooms.find(game => game.participants.find(id => id = player1_id));
			if (check) {
				return null;
			}
			check = JogoService.rooms.find(game => game.participants.find(id => id = player2_id));
			if (check) {
				return null;
			}
		}

		const game = new GGame(player1_id, player2_id, hits_for_acceleration);
		JogoService.rooms.push(game);
		// console.log("\n\nStartGame Function\n\n id1: ", player1_id, "\n id2: ", player2_id);

		await this.gameRepository.updateMatchStatus(player1_id, "PLAYING");
		await this.gameRepository.updateMatchStatus(player2_id, "PLAYING");
		return game;
	}

	// Y: acima + / abaixo - X: direita + / esquerda -
	verifyCollisionPaddles(game: GGame) {
		let verifyCollisionPaddleLeft = () => {

			let half_paddle_size = game.paddleLeft.height / 2;
			let half_ball_size = game.ball.size / 2;

			if (game.ball.positionX <= game.paddleLeft.positionX) {
				// console.log("\n\n\n\nHit Paddle Left: ");
				if ((game.ball.positionY + half_ball_size) < (game.paddleLeft.positionY - half_paddle_size)) {
					game.placarRight++;
					return false
				}
				if ((game.ball.positionY - half_ball_size) > (game.paddleLeft.positionY + half_paddle_size)) {
					game.placarRight++;
					return false
				}
				game.lastPaddleHitted = "left";

				//Muda direção em X, mudando o sinal do número
				game.ball.directionX *= -1;
				game.paddle_hits++;
				game.ball_refX = 0;
				game.ball_refY = 0;
				game.ball.hit_positionY = game.ball.positionY;

				//Cálculo do ângulo
				if (game.ball.positionY >= game.paddleLeft.positionY) {
					// console.log("ball > paddle\n\n");
					// console.log("padle positionY: ", game.paddleRight.positionY);
					// console.log("ball positionY: ", game.ball.positionY);
					let hit_pos = (game.ball.positionY - game.paddleLeft.positionY) / 1.00;
					// console.log("padle hit position: ", hit_pos);
					let paddle_half_size = game.paddleLeft.height / 2;
					let paddle_hit = ((hit_pos * 100) / paddle_half_size) / 1.00;
					// console.log("paddle_hit: ", paddle_hit, "\n");
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					// console.log("padle hit perc", paddle_hit_perc);
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					// console.log("ball angle", game.ball.angle, "\n\n");
					game.ball.directionY = 1;
					// game.ball.directionY_up == false

				}
				if (game.ball.positionY < game.paddleLeft.positionY) {
					// console.log("ball < paddle\n\n");
					// console.log("padle positionY: ", game.paddleRight.positionY);
					// console.log("ball positionY: ", game.ball.positionY);
					let hit_pos = (game.paddleLeft.positionY - game.ball.positionY) / 1.00;
					// console.log("padle hit position: ", hit_pos);
					let paddle_half_size = game.paddleLeft.height / 2;
					let paddle_hit = ((hit_pos * 100) / paddle_half_size) / 1.00;
					// console.log("paddle_hit: ", paddle_hit, "\n");
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					// console.log("padle hit perc", paddle_hit_perc);
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					// console.log("ball angle", game.ball.angle, "\n\n");
					game.ball.directionY = -1;
					// game.ball.directionY_up == true

				}
			}
			return true;
		}

		let verifyCollisionPaddleRight = () => {
			let half_paddle_size = game.paddleRight.height / 2;
			let half_ball_size = game.ball.size / 2;

			if (game.ball.positionX >= game.paddleRight.positionX) {
				// console.log("\n\n\n\nHit Paddle Right:  ");
				if ((game.ball.positionY + half_ball_size) < (game.paddleRight.positionY - half_paddle_size)) {
					game.placarLeft++;
					return false
				}
				if ((game.ball.positionY - half_ball_size) > (game.paddleRight.positionY + half_paddle_size)) {
					game.placarLeft++;
					return false
				}

				game.lastPaddleHitted = "right";
				//Muda direção em X, mudando o sinal do numero
				game.ball.directionX *= -1;
				game.paddle_hits++;
				game.ball_refX = 0;
				game.ball_refY = 0;
				game.ball.hit_positionY = game.ball.positionY;

				//Cálculo do ângulo
				if (game.ball.positionY >= game.paddleRight.positionY) {
					// console.log("ball > paddle\n\n");
					// console.log("padle positionY: ", game.paddleRight.positionY);
					// console.log("ball positionY: ", game.ball.positionY);
					let hit_pos = (game.ball.positionY - game.paddleRight.positionY) / 1.00;
					// console.log("padle hit position: ", hit_pos);
					let paddle_half_size = game.paddleRight.height / 2;
					let paddle_hit = (hit_pos * 100 / paddle_half_size) / 1.00;
					// console.log("paddle_hit: ", paddle_hit, "\n");
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					// console.log("padle hit perc", paddle_hit_perc);
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					// console.log("ball angle", game.ball.angle, "\n\n");
					game.ball.directionY = 1;
					// game.ball.directionY_up == true
				}
				if (game.ball.positionY < game.paddleRight.positionY) {
					// console.log("ball < paddle\n\n");
					// console.log("padle positionY: ", game.paddleRight.positionY);
					// console.log("ball positionY: ", game.ball.positionY);
					let hit_pos = (game.paddleRight.positionY - game.ball.positionY) / 1.00;
					// console.log("padle hit position: ", hit_pos);
					let paddle_half_size = game.paddleRight.height / 2;
					let paddle_hit = ((hit_pos * 100) / paddle_half_size) / 1.00;
					// console.log("paddle_hit: ", paddle_hit, "\n");
					let paddle_hit_perc = (paddle_hit / 100) / 1.00;
					// console.log("padle hit perc", paddle_hit_perc);
					game.ball.angle = game.ball.max_angle * paddle_hit_perc;
					// console.log("ball angle", game.ball.angle, "\n\n");
					game.ball.directionY = -1;
					// game.ball.directionY_up == false;
				}
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
				game.ball.directionY = 1;
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
				game.ball.directionY = -1;
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

	movePaddle(roomID: string, isLeft: boolean, isUp: boolean, pause: boolean) {
		let game = JogoService.rooms.find(game => game.roomID == roomID);
		if (isLeft == true) {
			if (isUp == true) {
				if (game.paddleLeft.position_front > 0) {
					game.paddleLeft.positionY -= game.paddleLeft.velocity;
					game.paddleLeft.position_front -= game.paddleLeft.velocity;
				}
			}
			else {
				if ((game.paddleLeft.position_front + game.paddleLeft.height) < game.window.height) {
					game.paddleLeft.positionY += game.paddleLeft.velocity;
					game.paddleLeft.position_front += game.paddleLeft.velocity;
				}
			}
		}
		else {
			if (isUp == true) {
				if (game.paddleRight.position_front > 0) {
					game.paddleRight.positionY -= game.paddleRight.velocity;
					game.paddleRight.position_front -= game.paddleRight.velocity;
				}
			}
			else {
				if ((game.paddleRight.position_front + game.paddleRight.height) < game.window.height) {
					game.paddleRight.positionY += game.paddleRight.velocity;
					game.paddleRight.position_front += game.paddleRight.velocity;
				}
			}
		}
		if (pause == true) {
			game.pause = true;
		} else {
			game.pause = false;
		}
	}

	checkScore(game: GGame): Boolean {
		if (game.placarLeft == 10 || game.placarRight == 10) {
			return true;
		}
		return false;
	}

	checkWinner(game: GGame) {
		if (game.placarLeft == 2) {
			game.winner = game.player_left.id;
			game.loser = game.player_right.id;
		}
		else if (game.placarRight == 2) {
			game.winner = game.player_right.id;
			game.loser = game.player_left.id;
		}
	}

	//trocar de aba disconecta do websocket??
	async disconnectUser(gameID: string, isLeft: boolean): Promise<any> {
		if (JogoService.rooms.length == 0) return;

		let game = JogoService.rooms.find(game => game.roomID == gameID);
		if (game == undefined) {
			return;
		}
		if (isLeft == true) {
			game.winner = game.player_left.id;
			game.placarLeft = 10;
		}
		else {
			game.winner = game.player_right.id;
			game.placarRight = 10;
		}
		let dto = new MatchDto(game);
		await this.gameRepository.addMatch(dto);
		//Seria melhor colocar essa informação em um cookie no frontend??
		await this.gameRepository.updateMatchStatus(game.player_left.id, "NONE");
		await this.gameRepository.updateMatchStatus(game.player_right.id, "NONE");

		/*REMOVER GAME DO ARRAY DE GAMES*/
		let response = game.copy(game);
		const index = JogoService.rooms.indexOf(game, 0);
		JogoService.rooms.splice(index, 1);

		return response;
	}

	resetGame(game: GGame) {
		game.ball.positionX = game.window.width / 2;
		game.ball.positionY = game.window.height / 2;
		game.ball.velocity = 5;
		// game.ball.directionX = Math.random() < 0.5 ? -1 : 1;
		game.ball.directionX = -1;
		game.ball.directionY = 1;
		game.ball.angle = 0;
		// game.paddleLeft.positionY = game.window.height / 2;
		// game.paddleRight.positionY = game.window.height / 2;
	}

	async updateGame(gameID: string): Promise<any> {
		if (JogoService.rooms.length == 0) {
			return null;
		}

		let game = JogoService.rooms.find(game => game.roomID == gameID);
		if (game == undefined) {
			return null;
		}
		if (this.verifyCollisionPaddles(game) == false) {
			if (this.checkScore(game)) {
				this.checkWinner(game);
				let dto = new MatchDto(game);
				await this.gameRepository.addMatch(dto);

				for (let id of game.participants) {
					console.log("id: ", id)
					await this.gameRepository.updateMatchStatus(id, "NONE");
				}

				let response = game.copy(game);
				const index = JogoService.rooms.indexOf(game, 0);
				JogoService.rooms.splice(index, 1);

				return response;
			}
			this.resetGame(game);
			this.verifyPower(game);
		}
		else {
			this.verifyCollisionWall(game);
		}

		if (!game.pause) {
			if (JogoService.x % 7 == 0) {
				game.ball.positionX += game.ball.path * game.ball.directionX;
				game.ball_refX += game.ball.path;
				JogoService.x = 0;
			}
			JogoService.x++;

			if (game.ball.angle != 0) {
				let tan = Math.tan((game.ball.angle * Math.PI) / 180);
				game.ball_refY = game.ball_refX * tan;
				if (game.ball_refY < 0) {
					game.ball_refY *= -1;
				}
				game.ball.positionY = game.ball.hit_positionY + (game.ball_refY * game.ball.directionY);
				if (game.ball.positionY > game.window.height) {
					game.ball.positionY = game.window.height;
				}
				if (game.ball.positionY < 0) {
					game.ball.positionY = 0;
				}
			}

			if (game.paddle_hits % game.hits_for_accelaration == 0) {
				game.ball.velocity += game.ball.velocity * (game.ball.acceleration_ratio / 100);
			}
		}
		return game;
	}

	async watchMatch(playerId: string, watcherId: string): Promise<GGame> {
		let game = JogoService.rooms.find(game => game.participants.find(id => id == watcherId));
		if (game == undefined) return null;

		await this.gameRepository.updateMatchStatus(playerId, "WATCHING");
		game.participants.push(playerId);
		game.watchs.push(playerId);
		return game;
	}

	async CreatePower(game: GGame) {
		let position_x = Math.floor(Math.random() * game.window.width);
		let position_y = Math.floor(Math.random() * game.window.height);
		console.log("Math.random(): ", position_x, " - ", position_y);
		switch (Math.round(Math.random())) {
			case (0):
				game.power = new AumentarPaddle(position_x, position_y);
				break;
			case (1):
				game.power = new DiminuirPaddle(position_x, position_y);
				break;
		}
	}

	async verifyPower(game: GGame) {
		let total_placar = game.placarLeft + game.placarRight;

		if (game.power) {
			if( (game.ball.positionX >= game.power.x - (game.power.size/2)  && game.ball.positionX <= game.power.x + (game.power.size/2)) && game.ball.positionY == game.power.y + game.ball.size ) {
				if (game.lastPaddleHitted == "left")
					game.power.apply(game.paddleLeft);
				else if (game.lastPaddleHitted == "right")
					game.power.apply(game.paddleRight);
				console.log(game.power.x, game.power.y);
				game.power = null;
			}
		}else if (total_placar % 2 == 0) {
			this.CreatePower(game);
		}
	}
}


