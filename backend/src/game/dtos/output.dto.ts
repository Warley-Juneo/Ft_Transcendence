export class UserMatchDto {
	opponent:			string;
	opponent_avatar:	string;
	opponent_score:		number;
	my_score:			number;
	status:				string;
}

export class UserMatchesDto {
	matches:	UserMatchDto[];
}