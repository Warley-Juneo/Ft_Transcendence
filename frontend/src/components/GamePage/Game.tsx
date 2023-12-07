import React, { useContext } from "react";
import InitalPhoto from "./warwick.png";
import SettingsPath from "./SettingsGame/SettingsGame";
import SettingsStore from "./SettingsStore/SettingsStore";
import axios from "axios";
import { UserData } from "../InitialPage/Contexts/Contexts";
import Cookies from "js-cookie";

export default function Game(): JSX.Element {
	const { user: { nickname }, updateDataUser } = useContext(UserData)
	const principalPhoto: React.CSSProperties = {
		backgroundImage: `url(${InitalPhoto})`,
		backgroundSize: "contain",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: "100%",
	}

	const addedCoins = () => {
		console.log("addedCoins");
		axios.post("http://localhost:3000/users/updateCoins", {
			nick_name: nickname,
			coins: 0,
		}, {
			headers: {
				Authorization: Cookies.get("jwtToken")
			}
		}).then((response) => {
			updateDataUser();
		}).catch((error) => {
			console.log(error);

		})
	}
	return (
		<div className="h-100 bg-custon-roxo rounded p-3 position-relative" style={principalPhoto}>
			<div className="row g-0 h-100">
				<div className="col-4">

				</div>
				<div className="col-8 d-flex">
					{/* <SettingsPath /> */}
					<SettingsStore />
				</div>
			</div>
		</div>
	)
}
