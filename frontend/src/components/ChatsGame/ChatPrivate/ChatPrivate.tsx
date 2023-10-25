import InputChats from '../InputChats';
import './ChatPrivate.css'
import FormatMessagensList from './FormatMessagensList';

export default function ChatPrivate() {
	return (
		<div className='chat d-flex flex-column bg-degrader rounded'>
			<h1 className='text-white text-center'>ChatPrivate</h1>
			<div className='p-2 overflow-auto mt-auto' id='messagens-chat'>
				<FormatMessagensList />
			</div>
			<InputChats />
		</div>
	);
}
