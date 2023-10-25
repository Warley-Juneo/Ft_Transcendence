import './ChatPrivate.css'
import { AiOutlineSend } from 'react-icons/ai';
import FormatMessagensList from './FormatMessagensList';

export default function ChatPrivate() {
	return (
		<div className='chat d-flex flex-column bg-degrader rounded'>
			<h1 className='text-white text-center'>ChatPrivate</h1>
			<div className='p-2 overflow-auto mt-auto' id='messagens-chat'>
				<FormatMessagensList />
			</div>
			<div className='d-flex align-items-center'>
				<input className='remove-format-input' type='text' placeholder='Digite sua mensagem' />
				<button className='remove-format-button'><AiOutlineSend size={30} /></button>
			</div>
		</div>
	);
}
