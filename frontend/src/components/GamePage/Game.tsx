import React from "react";
import Coins from "./Coins";
import InitalPhoto from "./warwick.png";
import DivSettingsGame from "./OptionsGame.tsx/DivSettingsGame";

export default function Game(): JSX.Element {
	const principalPhoto: React.CSSProperties = {
		backgroundImage: `url(${InitalPhoto})`,
		backgroundSize: "contain",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: "100%",
		display: "flex",
	}

	return (
		<div className="h-100 bg-custon-roxo rounded p-3 position-relative">
			<Coins />
			<div style={principalPhoto}>
				<DivSettingsGame />
				<div className="col"></div>
			</div>
		</div>
	)
}
