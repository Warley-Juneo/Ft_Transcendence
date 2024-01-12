import  { useContext, useEffect, useState } from "react";
import { ChatContext, Messages } from "./ChatPublic";
import InputChats from "../InputChats";
import { UserData, socket } from '../../InitialPage/Contexts/Contexts';
import FormatMessages from "../FormatMessagens/FormatMessagens";

export default function MessagensArea(): JSX.Element {
	const { chatData: {id, message, name} } = useContext(ChatContext);

	const [messages, setMessages] = useState<Messages[]>(message);
	const user = useContext(UserData);

	useEffect(() => {
		socket.on('chatMessage', (data) => {
			try {
				data = JSON.parse(data) as Messages;
				if (data.chat_name !== name) {
					return;
				}
				setMessages((prevMessagens) => [...prevMessagens, data]);
			} catch (error) {
				console.log(error);
			}
		});
		return () => {
			socket.off('chatMessage');
		}
	}, [socket]);

	let obj = {
		chatId: id,
		user_id: user.user.id,
		content: '',
		route: 'group-message',
		chat_name: name,
	}
	return (
		<>
			<FormatMessages messagens={messages}
				user={user.user}
			/>
			<InputChats
				socket={socket}
				obj={obj}
			/>
		</>
	)
}
