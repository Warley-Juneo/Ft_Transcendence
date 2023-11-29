import { useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { Socket } from 'socket.io-client';

type PropsInputChats = {
	socket: Socket,
	chatId: string,
	userId: string,
}

type user = {
	id: string,
	nickname: string,
	avatar: string,
	is_active: boolean,
}

type retornWebSocket = {
	id: string,
	content: string,
	user: user,
	data: string,
}

export default function InputChats(props: PropsInputChats) {
	const inputChat = useRef<HTMLInputElement>(null);

	const sendMessageClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
		console.log("clicou", inputChat.current?.value)
		let obj = {
			content: inputChat.current?.value,
			chatId: props.chatId,
			user_id: props.userId,
		}
		props.socket.emit('chatroom-message', obj);
	}


	const sendMessageEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			let obj = {
				content: event.currentTarget.value,
				chatId: props.chatId,
				user_id: props.userId,
			}
			props.socket.emit('chatroom-message', obj);
			event.currentTarget.value = '';
		}
	}

	return (
		<div className='d-flex align-items-center'>
			<input
				className='remove-format-input'
				type='text'
				ref={inputChat}
				placeholder='Digite sua mensagem'
				onKeyDown={sendMessageEnter}
			/>
			<button
				className='remove-format-button'>
				<AiOutlineSend size={30}
				onClick={sendMessageClick}
				/>
			</button>
		</div>
	)
}
