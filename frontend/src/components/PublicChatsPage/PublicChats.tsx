import React, { SetStateAction, useEffect, useState } from 'react';
import bgChats from '../../assets/game/planets/backgrounds/bgChats.jpg'
import ScreenCreateNewChat from './ScreemCreateNewChat';
import BarOptions from './BarOptions';
import ChatList from './ChatsList';
import Cookies from 'js-cookie';
import axios from 'axios';
import './PublicChats.css';
import ButtonClosed from '../GamePage/Game/ButtonClosed';

export type t_chat = {
	id: string;
	name: string;
	owner_nickname: string;
	photoUrl: string;
	password: string;
	type: string;
	onlines: number;
};

type propsPageChats = {
	openPageChats: React.Dispatch<SetStateAction<boolean>>;
}

export default function PageChats(props: propsPageChats) {
	const [chatList, setChatList] = useState<t_chat[]>([]);
	const [showCreateChat, setShowCreateChat] = useState(false);

	const getListPublicChats = () => {
		axios.get("http://localhost:3000/chatroom/find-all-public", {
			headers: {
				Authorization: Cookies.get("jwtToken"),
			}
		}).then((res) => {
			setChatList(res.data.chatrooms)
		})
	}

	const getListPrivateChats = () => {
		axios.get("http://localhost:3000/chatroom/find-private", {
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
			getListPublicChats();
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

		axios.post('http://localhost:3000/chatroom/create-group',
			dataPost, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		}).then((res) => {
			setChatList(res.data.chatrooms)
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getListPublicChats()
	}, [])

	const cssDivChats: React.CSSProperties = {
		backgroundImage: `url(${bgChats})`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
		color: 'white',
		height: '75%',
		width: '75%',
		padding: '7%'
	}


	return (
		<div className='bg-custon-roxo rounded position-absolute top-50 start-50 translate-middle'
			style={cssDivChats}
		>
			<ButtonClosed backgroundColor="#46668a"
				backgroundShadow="#0c1d3b"
				openStore={props.openStore}
			/>
			<div className='d-flex flex-column h-100'>
				<BarOptions
					handleSearchChats={handleSearchChats}
					setShowCreateChat={setShowCreateChat}
					getListPublicChats={getListPublicChats}
					getListPrivateChats={getListPrivateChats}
				/>
				{showCreateChat ? <ScreenCreateNewChat setShowCreateChat={setShowCreateChat} createNewChat={createNewChat} /> : null}
				<div className='d-flex p-3 overflow-auto' id='showChats'>
					<ChatList listChats={chatList}/>
				</div>
			</div>
		</div>
	)
}
