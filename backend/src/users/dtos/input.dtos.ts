import { IsNotEmpty, IsString } from "class-validator";

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

export class ProfileDto {
	@IsNotEmpty()
	nick_name:	string;
}