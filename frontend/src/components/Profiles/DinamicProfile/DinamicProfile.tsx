import { useEffect, useState } from "react";
import { InfosUserPerfil } from "../typesProfile";
import Bar from "./Bar"
import axios from "axios";
import Cookies from "js-cookie";
import InfosUser from "./InfosUser";

export default function DinamicProfile({ nickName }: { nickName: string }) {

	return (
		<div className="text-white end-0 position-absolute bg-custon-roxo">
			<Bar />
			<InfosUser nickName={nickName}/>
		</div>
	)
}
