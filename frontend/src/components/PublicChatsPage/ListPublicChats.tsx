import { t_chat, returnResponseMocket } from './MockResponseApi';
import { useState } from 'react';
import ChatList from './ColumChats';
import BarOptions from './BarOptions';
import './listGroups.css';
import CreateNewChat from './CreateNewChat';


export default function PageChats() {
	const [chatList, setChatList] = useState<t_chat[]>(returnResponseMocket());
	const [showCreateChat, setShowCreateChat] = useState(false);

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

	function showScreeToCreateChat() {
		setShowCreateChat(!showCreateChat);
	}

	function createNewChat(form: FormData) {
		setShowCreateChat(!showCreateChat);
	}

	function openChatSelected(chatName: string) {

		alert('abrir chat selecionado');
	}
	return (
		<div className='d-flex flex-column bg-custon-roxo rounded h-100 p-2 text-white'>
			<BarOptions handleSearchChats={handleSearchChats} showScreeToCreateChat={showScreeToCreateChat} />
			{showCreateChat ? <CreateNewChat showScreeToCreateChat={showScreeToCreateChat} createNewChat={createNewChat} /> : null}
			<div className='d-flex p-3 overflow-auto' id='showChats'>
				<ChatList listChats={chatList} openChatSelected={openChatSelected} />
			</div>
		</div>
	);
}
