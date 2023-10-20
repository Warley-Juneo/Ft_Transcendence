import { t_chat, returnResponseMocket } from './MockResponseApi';
import { useState } from 'react';
import ChatList from './ColumChats';
import BarOptions from './BarOptions';
import './listGroups.css';


export default function PageChats() {
	var [chatList, setChatList] = useState<t_chat[]>(returnResponseMocket());

	function handleSearchChats(event: React.ChangeEvent<HTMLInputElement>) {
		let value : string = event.target.value.toLowerCase();

		if (value === '') {
			setChatList(returnResponseMocket());
		}
		else {
			let newList : t_chat[] = [];

			for (const chat of chatList) {
				if (chat.name.toLowerCase().includes(value)) {
					newList.push(chat);
				}
			}
			setChatList(newList);
		}
	}

	return (
		<div className='d-flex flex-column bg-custon-roxo rounded h-100 p-2 text-white'>
			{BarOptions(handleSearchChats)}
			<div className='d-flex p-3 overflow-auto' id='showChats'>
				{ChatList(chatList)}
			</div>
		</div>
	);
}
