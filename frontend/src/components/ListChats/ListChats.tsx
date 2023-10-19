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
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},
	{
		name: 'O grande capitão Usopp',
		onlines: 11,
		adm: 'Ussop',
	},

];


function ListChats() {
	return (
		<div className='d-flex flex-column bg-custon-roxo rounded h-100 p-2 text-white'>
			<BarOptions />
			<div className='d-flex p-2 overflow-auto' id='showChats'>
				{ColumChats(chats)}
			</div>
		</div>
	);
}

export default ListChats;
