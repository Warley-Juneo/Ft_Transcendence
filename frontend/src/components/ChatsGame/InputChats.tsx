import { AiOutlineSend } from 'react-icons/ai';



export default function InputChats({socket}: any) {

	const sendMessageEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			
			let obj = {
				content:   	event.currentTarget.value,
				chatId:		'175b8c64-4b1a-4270-b59c-cf431e693dd6',
				user_id:	'd381eec1-d19b-4654-9766-cbcf4d0b27e9',
			}
			
			socket.emit('chatroom-message', obj);
			
			socket.on('response', (data: string) => {
				// vou acompanhar a tela do fausto a partir
				// porque quem manja de consultar banco de dados é ele.
				console.log(data);
			})

		}
	}

	return (
		<div className='d-flex align-items-center'>
			<input
				className='remove-format-input'
				type='text'
				placeholder='Digite sua mensagem'
				onKeyDown={sendMessageEnter}
				/>
			<button
				className='remove-format-button'>
				<AiOutlineSend size={30}
				// onClick={sendMessageClick}
				/>
			</button>
		</div>
	)
}
