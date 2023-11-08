export class MatchDto {
	player:			string;
	player_avatar:	string;
	player_score:	number;
	my_score:		string;
	score_p2:		number;
	status:			string;
}

export class UserMatchesDto {
	matches:	MatchDto[];
}