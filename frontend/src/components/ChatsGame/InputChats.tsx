import { AiOutlineSend } from 'react-icons/ai';

export default function InputChats({socket}: any) {

	const sendMessageEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			socket.emit('public_chat', event.currentTarget.value);
			
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
