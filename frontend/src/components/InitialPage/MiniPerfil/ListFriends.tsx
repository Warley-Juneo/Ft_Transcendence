import StatusOnline from './StatusOnline';
import { useState } from 'react';
import ChatPrivate from '../../ChatsGame/ChatPrivate/ChatPrivate';


export type Players = {
	avatar: string,
	id: string,
	nickname: string,
	is_active: boolean,
}

export default function ListFriends({players} : { players: Players[]}) {
	const	[chatPrivate, setChatPrivate] = useState(false);

	const showChatPrivate = () => {
		setChatPrivate(!chatPrivate);
	}

	return (
		<div className='p-2 text-white overflow-auto'>
			{chatPrivate && <ChatPrivate />}
			{players.map((play : Players) => {
				return (
					<div className='d-flex hover' onClick={showChatPrivate} key={play.id}>
					<img className="foto-list-friends" src={play.avatar} alt='foto' />
					{StatusOnline(play.nickname)}
				</div>
				)
			})}

		</div>
	);
}
