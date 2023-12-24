export class OutputLandinPageDto {
  id: string;
  nickname: string;
  avatar: string;
  friend_list: string[];
  coins: number;
  twoFA: boolean;

  constructor(obj: any) {
	this.id = obj.id;
	this.nickname = obj.nickname;
	this.avatar = obj.avatar;
	this.friend_list = obj.friend_list;
	this.coins = obj.coins;
	this.twoFA = obj.twoFA;
  }
}
