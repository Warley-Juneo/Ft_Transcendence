import  { useContext, useEffect, useState } from "react";
import { ChatContext, Messages } from "./ChatPublic";
import InputChats from "../InputChats";
import io, { Socket } from 'socket.io-client';
import { DataUser } from '../../InitialPage/Contexts/Contexts';
import FormatMessages from "../FormatMessagens/FormatMessagens";

export default function MessagensArea(): JSX.Element {
	const { dataChat: {id, message}, setDinamicProfile } = useContext(ChatContext);

	const [messages, setMessages] = useState<Messages[]>(message);
	const [socketIO] = useState<Socket>(io('http://localhost:3000'));
	const user = useContext(DataUser);

	useEffect(() => {
		socketIO.on('connect', () => {
			console.log('Conectei no backend');
		});

		return () => {
			socketIO.disconnect();
		}
	}, []);

	useEffect(() => {
		socketIO.on('chatMessage', (data) => {
			try {
				data = JSON.parse(data) as Messages;
				setMessages((prevMessagens) => [...prevMessagens, data]);
			} catch (error) {
				console.log(error);
			}
		});
	}, [socketIO]);

	let obj = {
		chatId: id,
		user_id: user.user.id,
		content: '',
		route: 'group-message'
	}
	return (
		<>
			<FormatMessages messagens={messages}
				user={user.user}
			/>
			<InputChats
				socket={socketIO}
				obj={obj}
			/>
		</>
	)
}
