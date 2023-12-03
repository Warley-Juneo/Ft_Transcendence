import { useContext, useEffect, useState } from 'react';
import { Messages } from '../ChatPublic/ChatPublic';
import FormatMessages from '../FormatMessagens/FormatMessagens';
import InputChats from '../InputChats';
import './ChatPrivate.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserData, socket } from '../../InitialPage/Contexts/Contexts';
import TitleChatPrivate from './Title';

type propsChatPrivate = {
	nick_name: string,
	avatar: string,
}

export default function ChatPrivate(props: propsChatPrivate) {
	const [messages, setMessages] = useState<Messages[]>([]);
	const user = useContext(UserData);

	const OpenDirectChat = () => {
		axios.post('http://localhost:3000/chatroom/open-direct', {
			my_nickname: user.user.nickname,
			other_nickname: props.nick_name
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
		socket.on('directChatMessage', data => {
			try {
				data = JSON.parse(data);
				console.log("data: ", data);
				setMessages((messages) => [...messages, data]);
				console.log("messages: ", messages);
			} catch (error) {
				console.log("error no cat: ", error);
			}
		});
	}, [socket])


	let obj = {
		my_nickname: user.user.nickname,
		other_nickname: props.nick_name,
		content: '',
		route: 'direct-message',
	}

	console.log("Avatar: ", props.avatar);
	console.log("Nickname: ", props.nick_name);
	return (
		<div className='text-white chat d-flex flex-column bg-degrader rounded'>
			<TitleChatPrivate nickname={props.nick_name} avatar={props.avatar} />
			<div className='p-2 overflow-auto mt-auto text-black' id='messagens-chat'>
				<FormatMessages messagens={messages} user={user.user}/>
			</div>
			<InputChats socket={socket} obj={obj} />
		</div>
	);
}
