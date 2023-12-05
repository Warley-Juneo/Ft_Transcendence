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
	}

	return (
		<div className="h-100 bg-custon-roxo rounded p-3">
			<Coins />
			<div style={principalPhoto}>
				<div className="row g-0 h-100">
					<div className="col-6 d-flex flex-column justify-content-center">
						<DivSettingsGame />
					</div>
					<div className="col">
					</div>
				</div>
			</div>
		</div>
	)
}
