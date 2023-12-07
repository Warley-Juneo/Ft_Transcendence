import React, { useContext } from "react";
import InitalPhoto from "./warwick.png";
import SettingsGame from "./SettingsGame/SettingsGame";
import SettingsStore from "./SettingsStore/SettingsStore";
import axios from "axios";
import { UserData } from "../InitialPage/Contexts/Contexts";
import Cookies from "js-cookie";

export default function Game(): JSX.Element {
	const { user: {nickname}, updateDataUser } = useContext(UserData)
	const principalPhoto: React.CSSProperties = {
		backgroundImage: `url(${InitalPhoto})`,
		backgroundSize: "contain",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: "100%",
		display: "flex",
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
		<div className="h-100 bg-custon-roxo rounded p-3 position-relative">
			<div style={principalPhoto}>
				<SettingsGame />
				<SettingsStore />
			</div>
		</div>
	)
}
