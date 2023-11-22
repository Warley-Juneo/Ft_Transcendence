import { useEffect, useState } from 'react';
import CreateNewChat from './CreateNewChat';
import BarOptions from './BarOptions';
import ChatList from './ChatsList';
import Cookies from 'js-cookie';
import axios from 'axios';
import './listGroups.css';

export type t_chat = {
	name: string;
	adm: string;
	chat_id: number;
	password: string;
	photoUrl: string;
	type: string;
	onlines: number;
};

export default function PageChats() {
	const [chatList, setChatList] = useState<t_chat[]>([]);
	const [showCreateChat, setShowCreateChat] = useState(false);

	const getListChats = () => {
		axios.get("http://localhost:3000/chatroom/find-all", {
			headers: {
				Authorization: Cookies.get("jwtToken"),
			}
		}).then((res) => {
			setChatList(res.data.chatrooms)
		})
	}


	function handleSearchChats(event: React.ChangeEvent<HTMLInputElement>) {
		let value: string = event.target.value.toLowerCase();

		if (value === '') {
			getListChats();
		}
		else {
			let newList: t_chat[] = [];

			for (const chat of chatList) {
				if (chat.name.toLowerCase().includes(value)) {
					newList.push(chat);
				}
			}
			setChatList(newList);
		}
	}

	function createNewChat(form: FormData) {
		setShowCreateChat(false);
		const dataPost = {
			name: form.get('nameChat'),
			type: 'public',
			password: form.get('passwordChat'),
			photoUrl: "https://photografos.com.br/wp-content/uploads/2020/09/fotografia-para-perfil.jpg",
		}
		if (form.get('privateChat') === 'private') {
			dataPost.type = 'private'
		} else if (form.get('protectChat') === 'protected') {
			dataPost.type = 'protected'
		}

		axios.post('http://localhost:3000/chatroom/create-chatroom',
			dataPost,
		{
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		}).then((res) => {
			setChatList(res.data.chatrooms)
		})
	}

	useEffect(() => {
		getListChats()
	}, [])
	function openChatSelected(chatName: string) {
		alert('abrir chat selecionado');
	}
	return (
		<div className='d-flex flex-column bg-custon-roxo rounded h-100 p-2 text-white'>
			<BarOptions handleSearchChats={handleSearchChats} setShowCreateChat={setShowCreateChat} />
			{showCreateChat ? <CreateNewChat setShowCreateChat={setShowCreateChat} createNewChat={createNewChat} /> : null}
			<div className='d-flex p-3 overflow-auto' id='showChats'>
				<ChatList listChats={chatList} openChatSelected={openChatSelected} />
			</div>
		</div>
	);
}
