import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class AddFriendDto {
	@IsNotEmpty()
	nick_name:	string;
}

export class UpdateProfileDto {
	@IsString()
	avatar:		string;

	@IsString()
	nick_name:	string;
}

export class UpdateCoinsDto {
	@IsString()
	nick_name:	string;

	@IsNumber()
	coins: number;
}

export class ProfileDto {
	@IsNotEmpty()
	nick_name:	string;
}
