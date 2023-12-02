import { useContext, useEffect, useState } from 'react';
import { Messages } from '../ChatPublic/ChatPublic';
import FormatMessages from '../FormatMessagens/FormatMessagens';
import InputChats from '../InputChats';
import './ChatPrivate.css'
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserData, SocketGame } from '../../InitialPage/Contexts/Contexts';

export type DataChat = {
	id: string,
	message: Messages[],
}

export default function ChatPrivate({ nick_name }: { nick_name: string }) {
	const [messages, setMessages] = useState<Messages[]>([]);
	const user = useContext(UserData);
	const socketIO = useContext(SocketGame);

	const OpenDirectChat = () => {
		axios.post('http://localhost:3000/chatroom/open-direct', {
			my_nickname: user.user.nickname,
			other_nickname: nick_name
		}, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		}).then((res) => {
			setMessages(res.data.direct_message);
		}).catch((err) => {
			console.log(err);
		})
	}

	useEffect(() => {
		OpenDirectChat();
	}, [])

	useEffect(() => {
		socketIO.on('directChatMessage', data => {
			try {
				data = JSON.parse(data);
				console.log("data: ", data);
				setMessages((messages) => [...messages, data]);
				console.log("messages: ", messages);
			} catch (error) {
				console.log("error no cat: ", error);
			}
		});
	}, [socketIO])


	let obj = {
		my_nickname: nick_name,
		other_nickname: user.user.nickname,
		content: '',
		route: 'direct-message',
	}

	return (
		<div className='chat d-flex flex-column bg-degrader rounded'>
			<h1 className='text-white text-center'>ChatPrivate</h1>
			<div className='p-2 overflow-auto mt-auto text-black' id='messagens-chat'>
				<FormatMessages
					messagens={messages}
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
