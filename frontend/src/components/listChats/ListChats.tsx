import './listGroups.css';
import { BiSearchAlt } from 'react-icons/bi';
import ColumChats from './ColumChats';

function ListChats() {
	return (
		<div className='bg-custon-roxo text-white h-100 p-2'>
			<div className='d-flex justify-content-end'>
				<div className='search-chats d-flex align-items-center w-25'>
					<BiSearchAlt size={30} style={{padding: '5px', color: '#0e0036', transform: 'scaleX(-1)'}}/>
					<input
						type='text'
						placeholder='Procurar grupo'
					/>
				</div>
			</div>
			<ColumChats />
			<ColumChats />
			<ColumChats />
		</div>
	);
}

export default ListChats;
