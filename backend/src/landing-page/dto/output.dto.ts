export class OutputLandinPageDto {
  id: string;
  nickname: string;
  avatar: string;
  friend_list: string[];

  constructor(obj: any) {
	this.id = obj.id;
	this.nickname = obj.nickname;
	this.avatar = obj.avatar;
	this.friend_list = obj.friend_list;
  }
}
