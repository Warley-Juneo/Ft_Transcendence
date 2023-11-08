import StatusOnline from './StatusOnline';
import { useState } from 'react';
import ChatPrivate from '../../ChatsGame/ChatPrivate/ChatPrivate';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import Cookies from 'js-cookie';


export type Players = {
	_avatar: string,
	_id: string,
	_nickname: string,
	_is_active: boolean,
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
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<div className='p-2 text-white overflow-auto'>
			{chatPrivate && <ChatPrivate />}
			{props.players.map((play: Players) => {
				return (
					<div className='d-flex hover'>
						<div className='d-flex' onClick={showChatPrivate} key={play._id}>
							<img className="foto-list-friends" src={play._avatar} alt='foto' />
							{StatusOnline(play._nickname)}
						</div>
						<div className='d-flex align-items-end p-2'>
							<MdDeleteForever size={20} onClick={() => { handleDeleteFriend(play._nickname) }} />
						</div>
					</div>
				)
			})}

		</div>
	);
}
