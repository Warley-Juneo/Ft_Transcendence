import { useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations/Configurations";
import { useLocation } from "react-router-dom";
import MessagensArea from "./MessagensArea";
import ListFriends, { Players } from "../../Profiles/MiniProfile/ListFriends";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";

export type Messages = {
	id:             string,
	content:        string,
	date:       	Date,
	user: {
		nickname: string,
		avatar: string,
	}
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
	let tmp = useLocation().state?.data as DataChat;
	const [showConfigurations, setShowConfigurations] = useState(false);
	const [dataChat, setDataChat] = useState<DataChat>(tmp);

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
				<DinamicProfile nickName='Mia' />

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
					<MessagensArea	messagens={dataChat.message}
									chatId={dataChat.id}
					/>
				</div>
			</div>
		</div>
	)
}
