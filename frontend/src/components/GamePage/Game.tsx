import React from "react";
import InitalPhoto from "./warwick.png";
import SettingsGame from "./SettingsGame/SettingsGame";
import SettingsStore from "./SettingsStore/SettingsStore";

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
			<div style={principalPhoto}>
				{/* <SettingsGame /> */}
				<SettingsStore />
				<div className="col"></div>
			</div>
		</div>
	)
}
