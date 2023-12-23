import { StatusOnline, StatusOffline } from './PlayersStatus';
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
	const [dataOpenDirect, setDataOpenDirect] = useState({ nickname: '', avatart: '' });

	function handleOpenChatPrivate(nickname: string, avatar: string) {
		setChatPrivate(!chatPrivate)
		setDataOpenDirect({ nickname: nickname, avatart: avatar })
	}


	if (!props.players) {
		return (
			<div>
				<div className='d-flex justify-content-center'>
					<p className='text-white'>Carregando...</p>
				</div>
			</div>
		)
	}
	return (
		<div className='p-2 text-white overflow-auto'>
			{!chatPrivate ? null :
				<ChatPrivate nick_name={dataOpenDirect.nickname} avatar={dataOpenDirect.avatart}
				/>
			}
			{props.players.map((play: Players) => {
				return (
					<div className='d-flex hover' key={play.id}>
						<div className='d-flex' onClick={() => handleOpenChatPrivate(play.nickname, play.avatar)}>
							<img className="foto-list-friends" src={play.avatar} alt='foto' />
							{play.is_active ? StatusOnline(play.nickname) : StatusOffline(play.nickname)}
						</div>
					</div>
				)
			})}

		</div>
	);
}
