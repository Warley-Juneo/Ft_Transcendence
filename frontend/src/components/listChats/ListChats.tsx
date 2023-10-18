import './listGroups.css';
import ColumChats from './ColumChats';
import BarOptions from './BarOptions';

function ListChats() {
	return (
		<div className='text-white h-100 p-2' id='list-chats'>
			<BarOptions />
			<ColumChats />
			<ColumChats />
			<ColumChats />
		</div>
	);
}

export default ListChats;
