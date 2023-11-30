import axios from "axios";
import Cookies from "js-cookie";
import { InfosUserPerfil } from "../typesProfile";
import { useState } from "react";

export default function Bar(): JSX.Element {
	const [infosUser, setInfosUser] = useState<InfosUserPerfil>({} as InfosUserPerfil);

	const getProfile = (): void => {
		axios.get(`http://localhost:3000/users/profile/?nick_name=${dataUser.user.nickname}`, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		})
			.then((response) => {
				setInfosUser(response.data);
			}
			).catch((error) => {
			})
	}

	return (
		<div className="text-white end-0 position-absolute">
			<h1>Bar</h1>
		</div>
	);
}
