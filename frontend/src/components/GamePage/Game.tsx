import React, { useContext } from "react";
import InitalPhoto from "./warwick.png";
import SettingsPath from "./SettingsGame/SettingsGame";
import SettingsStore from "./SettingsStore/SettingsStore";
import axios from "axios";
import { UserData } from "../InitialPage/Contexts/Contexts";
import Cookies from "js-cookie";
import { ReactComponent as Store } from '../../assets/store/store.svg'
import { ReactComponent as BackPack } from '../../assets/backpack.svg'
import ButtonsMain from "./ButtonsMain";

export default function Game(): JSX.Element {
	const { user: { nickname }, updateDataUser } = useContext(UserData)
	const [isHover, setIsHover] = React.useState(false)

	const principalPhoto: React.CSSProperties = {
		backgroundImage: `url(${InitalPhoto})`,
		backgroundSize: "contain",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: "100%",
		display: "flex",
	}

	const CSSButtonsScreen : React.CSSProperties = {
		cursor: 'pointer',
		transition: '0.3s',
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
		<div className="h-100 bg-custon-roxo rounded position-relative" style={principalPhoto}>
			<ButtonsMain Photo={Store} position="top-0 end-0" />
			<ButtonsMain Photo={BackPack} position="bottom-0 end-0" />
			{/* <SettingsPath /> */}
			{/* <SettingsStore /> */}
		</div>
	)
}
