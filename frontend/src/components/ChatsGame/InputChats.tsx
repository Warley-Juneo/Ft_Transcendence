import { AiOutlineSend } from 'react-icons/ai';

export default function InputChats() {

	const sendMessageClick = () => {
		alert('enviar mensagem');
	}

	const sendMessageEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			alert('enviar mensagem');
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
				onClick={sendMessageClick}
				/>
			</button>
		</div>
	)
}
