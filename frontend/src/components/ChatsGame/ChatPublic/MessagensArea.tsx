import { useContext, useEffect, useState } from "react";
import { Messages } from "./ChatPublic";
import InputChats from "../InputChats";
import io, { Socket } from 'socket.io-client';
import { DataUser } from "../../InitialPage/InitialPage";

type PropsInputChats = {
	chatId: string,
	messagens: Messages[],
}

export default function MessagensArea(props: PropsInputChats): JSX.Element {
	const [socketIO] = useState<Socket>(io('http://localhost:3000'));
	const user = useContext(DataUser);

	const [messages, setMessages] = useState<Messages[]>(props.messagens);

	console.log("MessagensArea:", props.messagens);
	console.log(typeof props.messagens);
	useEffect(() => {
		socketIO.on('connect', () => {
			console.log('Conectei no backend');
		});

		return () => {
			socketIO.disconnect();
		}
	}, []);

	return (
		<>
			<div className="h-100 text-black p-3 overflow-auto">
				{messages.map((message) => {
					return (
						<div key={message.id} className="d-flex flex-column">
							<div className="d-flex flex-row">
								<img src={message.user.avatar} alt="Avatar" className="rounded-circle" width="50" height="50" />
								<h5 className="text-white">{message.user.nickname}</h5>
							</div>
							<p className="text-white">{message.content}</p>
						</div>
					)
				})}
			</div>
			<InputChats
				socket={socketIO}
				chatId={props.chatId}
				userId={user.user.id}
			/>
		</>
	)
}
