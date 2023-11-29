import { useContext, useEffect, useState } from "react";
import { Messages } from "./ChatPublic";
import InputChats from "../InputChats";
import io, { Socket } from 'socket.io-client';
import { DataUser } from "../../InitialPage/InitialPage";
import FormatMessages from "../FormatMessagens/FormatMessagens";

type PropsInputChats = {
	chatId: string,
	messagens: Messages[],
}

export default function MessagensArea(props: PropsInputChats): JSX.Element {
	const [messages, setMessages] = useState<Messages[]>(props.messagens);
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
		chatId: props.chatId,
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
