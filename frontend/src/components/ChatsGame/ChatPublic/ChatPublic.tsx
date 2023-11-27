import { useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations/Configurations";
import InputChats from "../InputChats";
import FormatMessagensList from "../ChatPrivate/FormatMessagensList";
import { useLocation } from "react-router-dom";
import ListFriends from "../../InitialPage/MiniPerfil/ListFriends";
import { Players } from "../../InitialPage/MiniPerfil/ListFriends";

type DataChat = {
	id: string
	name: string
	photo: string
	users: Players[]
}

export default function ChatPublic() {
	const [showConfigurations, setShowConfigurations] = useState(false);
	let DataChat = useLocation().state?.data as DataChat;
	console.log(DataChat);

	if (!DataChat) {
		DataChat = {
			id: '',
			name: '',
			photo: '',
			users: [],
		}
	}

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
			<div className="row g-0 h-100 p-2">
				{/* Lado esquerdo do chat*/}
				<div className="col-3 border-end h-100">
					<ListFriends	players={DataChat.users}
									getPlayers={() => { }}
					/>
				</div>

				{/* Lado direto do chat*/}
				<div className="col-9 d-flex flex-column h-100 position-relative">
					<BarConfigurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)} />
					{showConfigurations === true ? <Configurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)} /> : null}
					<div className="h-100 text-black p-3 overflow-auto">
						<FormatMessagensList />
					</div>
					<InputChats />
				</div>
			</div>
		</div>
	)
}
