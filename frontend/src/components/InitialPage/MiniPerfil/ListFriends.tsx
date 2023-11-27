import StatusOnline from './StatusOnline';
import { useState } from 'react';
import ChatPrivate from '../../ChatsGame/ChatPrivate/ChatPrivate';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import Cookies from 'js-cookie';


export type Players = {
	avatar: string,
	id: string,
	nickname: string,
	is_active: boolean,
}

type PropsListFriends = {
	players: Players[],
	getPlayers: (route: string) => void,
}
export default function ListFriends(props: PropsListFriends) {
	const [chatPrivate, setChatPrivate] = useState(false);

	const showChatPrivate = () => {
		setChatPrivate(!chatPrivate);
	}

	function handleDeleteFriend(nickname: string) {
		axios.post('http://localhost:3000/users/delete_friend', {
			nick_name: nickname,
		}, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			},
		})
			.then((res) => {
				props.getPlayers('http://localhost:3000/users/friends');
			})
	}

	return (
		<div className='p-2 text-white overflow-auto'>
			{chatPrivate && <ChatPrivate />}
			{props.players.map((play: Players) => {
				return (
					<div className='d-flex hover' key={play.id}>
						<div className='d-flex' onClick={showChatPrivate}>
							<img className="foto-list-friends" src={play.avatar} alt='foto' />
							{StatusOnline(play.nickname)}
						</div>
						<div className='d-flex align-items-end p-2'>
							<MdDeleteForever size={20} onClick={() => { handleDeleteFriend(play.nickname) }} />
						</div>
					</div>
				)
			})}

		</div>
	);
}
