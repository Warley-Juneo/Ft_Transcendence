import { useContext, useEffect, useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations/Configurations";
import { useLocation } from "react-router-dom";
import ListFriends from "../../InitialPage/MiniPerfil/ListFriends";
import { Players } from "../../InitialPage/MiniPerfil/ListFriends";
import io, { Socket } from 'socket.io-client';
import MessagensArea from "./MessagensArea";
import { DataUser } from "../../InitialPage/InitialPage";

type Messages = {
	id:             string;
	content:        string;
	img_url:        string;
	user_nickname:  string;
	user_avatar:		string;
	data:	        	Date;
}

export type DataChat = {
	id: string,
	name: string,
	photo: string,
	members: Players[],
	admin: Players[],
	message: Messages[],
}

export default function ChatPublic() {
	const [socketIO, setSocketIO] = useState<Socket>(io('http://localhost:3000'));
	const user = useContext(DataUser);

	const [showConfigurations, setShowConfigurations] = useState(false);
	let tmp = useLocation().state?.data as DataChat;
	const [dataChat, setDataChat] = useState<DataChat>({
		id: '',
		name: '',
		photo: '',
		admin: [],
		members: [],
		message: [],
	});

	useEffect(() => {
		setDataChat (tmp)
	}, [])

	useEffect(() => {
		socketIO.on('connect', () => {
			console.log('Conectei no backend');
		});

		return () => {
			socketIO.disconnect();
		}
	},[]);

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
			<div className="row g-0 h-100 p-2">
				{/* Lado esquerdo do chat*/}
				<div className="col-3 border-end h-100">
					<ListFriends	players={dataChat.members}
									getPlayers={() => { }}
					/>
				</div>

				{/* Lado direto do chat*/}
				<div className="col-9 d-flex flex-column h-100 position-relative">
					<BarConfigurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)} />
					{!showConfigurations === true ? null :
						<Configurations	openOrClosedConf={() => setShowConfigurations(!showConfigurations)}
										numberMembers={dataChat.members.length}
										setDataChat={setDataChat}
						/>
					}
					<MessagensArea	socket={socketIO}
									chatId={dataChat.id}
									userId={user.user.id}
					/>
				</div>
			</div>
		</div>
	)
}
