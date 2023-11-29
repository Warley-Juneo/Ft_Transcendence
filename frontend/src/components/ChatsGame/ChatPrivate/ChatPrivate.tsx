import { useContext, useEffect, useState } from 'react';
import { Messages } from '../ChatPublic/ChatPublic';
import FormatMessages from '../FormatMessagens';
import InputChats from '../InputChats';
import './ChatPrivate.css'
import { DataUser } from '../../InitialPage/InitialPage';
import { io, Socket } from 'socket.io-client';

export default function ChatPrivate({nick_name} : {nick_name: string}) {
	const [messages, setMessages] = useState<Messages[]>([]);
	const [socketIO] = useState<Socket>(io('http://localhost:3000'));
	const user = useContext(DataUser);

	console.log("nickName User", user.user.nickname);
	console.log("nickName Friend", nick_name);

	useEffect(() => {
		socketIO.on('connect', () => {
			console.log('Conectei no backend');
		});

		return () => {
			socketIO.disconnect();
		}
	}, []);

	let obj = {
		my_nickname: nick_name,
		other_nickname: user.user.nickname,
		content: '',
		route: 'direct-chatroom-message',
	}

	return (
		<div className='chat d-flex flex-column bg-degrader rounded'>
			<h1 className='text-white text-center'>ChatPrivate</h1>
			<div className='p-2 overflow-auto mt-auto text-black' id='messagens-chat'>
				<FormatMessages	messagens={messages}
								user={user.user}
				/>
			</div>
			<InputChats
				socket={socketIO}
				obj={obj}
			/>
		</div>
	);
}
