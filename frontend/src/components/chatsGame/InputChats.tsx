import { AiOutlineSend } from 'react-icons/ai';

export default function InputChats() {
	return (
		<div className='d-flex align-items-center'>
			<input className='remove-format-input' type='text' placeholder='Digite sua mensagem' />
			<button className='remove-format-button'><AiOutlineSend size={30} /></button>
		</div>
	)
}
