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
	const [messageErr, setMessageErr] = useState<String>("");
	const user = useContext(UserData);

	const OpenDirectChat = () => {
		axios.post(`${process.env.REACT_APP_HOST_URL}/chatroom/open-direct`, {
			my_nickname: user.user.nickname,
			other_nickname: props.nick_name
		}, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420",
			}
		}).then((res) => {
			setMessages(res.data);
		}).catch((err) => {
			setMessageErr(err.response.data.msg)
		})
	}

	useEffect(() => {
		OpenDirectChat();
	}, [])

	useEffect(() => {
		socket.on('directChatMessage', data => {
			try {
				data = JSON.parse(data);
				setMessages((messages) => [...messages, data]);
			} catch (error) {
				console.log("error no cat: ", error);
			}
		});
		return () => {
			socket.off('directChatMessage');
		}
	}, [socket])


	let obj = {
		my_nickname: user.user.nickname,
		other_nickname: props.nick_name,
		content: '',
		route: 'direct-message',
	}

	return (
		<div className='text-white chat d-flex flex-column bg-degrader rounded'>
			<TitleChatPrivate nickname={props.nick_name} avatar={props.avatar} />
			<div className='p-2 overflow-auto mt-auto text-black' id='messagens-chat'>
				<FormatMessages messagens={messages} user={user.user} messageErr={messageErr}/>
			</div>
			<InputChats socket={socket} obj={obj} disable={messageErr !== ""} />
		</div>
	);
}
