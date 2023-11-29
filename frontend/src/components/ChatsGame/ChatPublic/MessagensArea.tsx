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

	return (
		<>
			<div className="h-100 text-black p-3 overflow-auto">
				{messages.map((message) => {
					if (message.user.nickname === user.user.nickname) {
						return (
							<div className='d-flex justify-content-end mb-2'>
								<div className='bg-light rounded me-2 p-1' style={{ whiteSpace: 'pre-line' }}>
									{message.content}
								</div>
								<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={message.user.avatar} alt='foto' />
							</div>
						);
					} else {
						return (
							<div className='d-flex mb-2'>
								<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={message.user.avatar} alt='foto' />
								<div className='bg-light rounded ms-2 p-1' style={{ whiteSpace: 'pre-line' }}>
									{message.content}
								</div>
							</div>
						);
					};
				})};
			</div>
			<InputChats
				socket={socketIO}
				chatId={props.chatId}
				userId={user.user.id}
			/>
		</>
	)
}
