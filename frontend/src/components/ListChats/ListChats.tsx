import returnResponseMocket from './MockResponseApi';
import { useState } from 'react';
import ColumChats from './ColumChats';
import BarOptions from './BarOptions';
import { Chat } from './MockResponseApi';
import './listGroups.css';


function ListChats() {
	var [searchChat, setSearchChat] = useState<Chat[]>(returnResponseMocket());

	function handleSearchChats(event: React.ChangeEvent<HTMLInputElement>) {
		let value : string;
		let newList : Chat[];

		newList = [];
		value = event.target.value.toLowerCase();
		if (value === '') {
			setSearchChat(returnResponseMocket());
		}
		else {
			for (const chat of searchChat) {
				if (chat.name.toLowerCase().includes(value)) {
					newList.push(chat);
				}
			}
			setSearchChat(newList);
		}
	}

	return (
		<div className='d-flex flex-column bg-custon-roxo rounded h-100 p-2 text-white'>
			<BarOptions handleSearchChats={handleSearchChats} />
			<div className='d-flex p-3 overflow-auto' id='showChats'>
				{ColumChats(searchChat)}
			</div>
		</div>
	);
}

export default ListChats;
