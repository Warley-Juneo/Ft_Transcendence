import { IsNotEmpty, isNotEmpty } from "class-validator";
import { GGame } from "../jogo/game.jogo.interfaces";

export class InputUserDto {
	@IsNotEmpty()
	user_id:	string;
}

export class DisconnectDto {
	@IsNotEmpty()
	user_id:	string;

	@IsNotEmpty()
	is_active:	boolean;
}

export class MatchDto {
	player1_id: string;
	score_p1:   number;
  
	player2_id: string;
	score_p2:   number;
  
	winner_id: 	string;
	loser_id:	string;
	draws:		boolean;

	constructor(game: GGame) {
		this.player1_id = game.player_left.id;
		this.score_p1 = game.placarLeft;
		this.player2_id = game.player_right.id;
		this.score_p2 = game.placarRight;
		this.winner_id = game.winner;
		this.loser_id = game.loser;
		this.draws = false;
	}
}