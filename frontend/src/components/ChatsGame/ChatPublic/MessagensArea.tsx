import { Socket } from "socket.io-client";
import InputChats from "../InputChats";

type PropsInputChats = {
	socket: Socket,
	chatId: string,
	userId: string,
}

export default function MessagensArea(props: PropsInputChats): JSX.Element {
	

	return (
		<>
			<div className="h-100 text-black p-3 overflow-auto">
			</div>
			<InputChats
				socket={props.socket}
				chatId={props.chatId}
				userId={props.userId}
			/>
		</>
	)
}
