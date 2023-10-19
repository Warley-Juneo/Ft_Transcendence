import './listGroups.css';
import ColumChats from './ColumChats';
import BarOptions from './BarOptions';

export type Chat = {
	name: string;
	onlines: number;
	adm: string;
};

const chats: Chat[] = [
	{
		name: 'Aonde e o Bar?',
		onlines: 5,
		adm: 'Zoro',
	},
	{
		name: 'Cassinho online',
		onlines: 15,
		adm: 'Nami',
	},
	{
		name: 'Assistindo Master Chef',
		onlines: 8,
		adm: 'Sanji',
	},
	{
		name: 'Assistindo the good doctor',
		onlines: 3,
		adm: 'Chopper',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
];


function ListChats() {
	return (
		<div className='text-white h-100 p-2' id='list-chats'>
			<BarOptions />
			<div id='showChats' className='p-2 opacity-75 d-flex'>

				<ColumChats />
			</div>
		</div>
	);
}

export default ListChats;
