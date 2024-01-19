import ListFriends, { Players } from "../../Profiles/MiniProfile/ListFriends";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";

import { createContext, useContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserData, socket } from "../../InitialPage/Contexts/Contexts";
import bgChatPublic from "../../../assets/game/bgChatPublic.png";
import RightSide from "./RightSide";
import ModalIsBanned from "./ModalIsBanned";

export type Messages = {
	id: string,
	content: string,
	date: Date,
	user: {
		nickname: string,
		avatar: string,
		id: string,
	}
}

export type ChatData = {
	id: string,
	name: string,
	photo: string,
	members: Players[],
	banned: Players[],
	kicked: Players[],
	admin: Players[],
	message: Messages[],
}

type DinamicProfile = {
	nickName: string,
	id: string,
}

export const ChatContext = createContext<{
	chatData: ChatData;
	setDataChat: React.Dispatch<React.SetStateAction<ChatData>>;
	setDinamicProfile: React.Dispatch<React.SetStateAction<DinamicProfile>>;
}>({
	chatData: {} as ChatData,
	setDataChat: () => { },
	setDinamicProfile: () => { }
});


type propsPageChats = {
	openPageChats: React.Dispatch<React.SetStateAction<string>>;
	chatName: string;
}

export default function ChatPublic(props: propsPageChats) {
	const [chatData, setDataChat] = useState<ChatData>({} as ChatData);
	const [dinamicProfile, setDinamicProfile] = useState<DinamicProfile>({} as DinamicProfile);
	const [showDinamicProfile, setShowDinamicProfile] = useState<string>('');
	const [isBanned, setIsBanned] = useState<boolean>(false);
	const myUser = useContext(UserData).user;

	function is_memberChat(chat_id: String, data: ChatData ) {
		// console.log("members: ", data.members)
		// console.log("banned: ", data.banned)
		// console.log("kicked: ", data.kicked)

		if (data.members.map((member) => member.nickname).includes(myUser.nickname)) {
			return
		} else if (data.banned.map((member) => member.nickname).includes(myUser.nickname)) {
			return
		} else if (data.kicked.map((member) => member.nickname).includes(myUser.nickname)) {
			return
		}


		let obj = {
				my_id: myUser.id,
				other_id: myUser.id,
				chat_name: props.chatName,
				chat_id: chat_id,
		}
		socket.emit("add-member-group", obj);
	}

	const getDataChat = () => {
		console.log("Cheguei")

		const ENV = `chat_name=${props.chatName}&password=''`
		axios.get(`${process.env.REACT_APP_HOST_URL}/chatroom/find-public/?${ENV}`, {
			headers: {
				Authorization: Cookies.get("jwtToken"),
				"ngrok-skip-browser-warning": "69420",
			}
		}).then((response) => {
			setDataChat(response.data)
			is_memberChat(response.data.id, response.data)
			socket.emit("open-group", {chatId: response.data.id});
		}).catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		getDataChat()
	}, [])

	useEffect(() => {
		if (dinamicProfile.nickName) {
			setShowDinamicProfile('show');
		}
	}, [dinamicProfile])

	//TODO: verificar se o usuario foi banido e manda ele sair
	//Sockets
	useEffect(() => {
		socket.on('checkStatus', (data: any) => {
			getDataChat();
		})
		return () => {
			socket.off('checkStatus')
		}
	}, [socket])


	useEffect(() => {
		socket.on('banMember', (id: any) => {
			console.log("BanMember: ", id)
			console.log("teste: ", myUser.id);
			if (myUser.id == id)
				setIsBanned(true);
			else
				getDataChat();
		})
		return () => {
			socket.off('banMember')
		}
	}, [socket])

	useEffect(() => {
		socket.on('updateChat', (data: any) => {
			getDataChat();
		})
		return () => {
			socket.off('updateChat')
		}
	}, [socket])

	useEffect(() => {
		socket.on('kickMember', (id: any) => {
			console.log("KickMember: ", id)
			if (myUser.id == id)
				setIsBanned(true);
			getDataChat();
		})
		return () => {
			socket.off('kickMember')
		}
	}, [socket])
	//##############################################################

	if (!chatData.name) return <div>Carregando...</div>

	// https://vetplus.vet.br/wp-content/uploads/2019/12/img_2427.jpg vc foi chutado
	return (
		<div className="rounded text-white
			position-absolute top-50 start-50 translate-middle h-75 w-75"
			style={{ backgroundImage: `url(${bgChatPublic})`, backgroundSize: 'cover' }}
		>
			{isBanned ? ModalIsBanned({openPageChats: props.openPageChats}) : null}
			<div className="row g-0 h-100 p-2">
				<ChatContext.Provider value={{ chatData: chatData, setDataChat, setDinamicProfile }}>
					<div className="col-3 border-end h-100">
						<ListFriends
							players={chatData.members}
							getPlayers={() => { }}
							admin={chatData.admin}
						/>
					</div>

					<div className="col-9 d-flex flex-column h-100 position-relative">
						<RightSide
							chatName={props.chatName}
							openPageChats={props.openPageChats}
						/>
					</div>
				</ChatContext.Provider>
			</div>


			{!showDinamicProfile ? null :
				<DinamicProfile
					openDinamicProfile={setShowDinamicProfile}
					nickName={dinamicProfile.nickName}
					id={dinamicProfile.id}
				/>
			}
		</div>
	)
}
