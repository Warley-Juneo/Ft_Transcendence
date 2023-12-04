import ButtonPlay from "./OptionsGame.tsx/ButtonPlay";
import playPong from '../../static/game/playPong.jpg'
import playSpecialPong from '../../static/game/playSpecialPong.jpg'
import { ReactComponent as CoinIcon } from '../../static/game/coin.svg';
import shopGame from '../../static/game/shopGame.jpg'
import React from "react";
import numberFive from "../../static/game/numberFive.png";
import numberTen from "../../static/game/numberTen.png";

const cssShopGame: React.CSSProperties = {
	backgroundImage: `url(${shopGame})`,
	backgroundSize: '100% 100%',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	width: '60rem',
	height: '40rem',
}

export default function Game(): JSX.Element {
	return (
		<div className="h-100 bg-custon-roxo rounded text-white align-items-center">
			<div className="d-flex">
				<div className="d-flex w-100 p-3" id='divOptionsStartGame'>
				<ButtonPlay photo={numberFive} content="5 Rounds" />
				<ButtonPlay photo={numberTen} content="10 Rounds" />
					<span className="ms-auto">
						<div className="d-flex align-items-end">
							<p className="me-2 fs-5">30</p>
							<CoinIcon style={{ height: '3rem', width: '3rem' }} />
						</div>
					</span>
				</div>
			</div>
			<div className="d-flex w-100 p-3" id='divOptionsStartGame'>
				<ButtonPlay photo={playPong} content="Normal Mod" />
				<ButtonPlay photo={playSpecialPong} content="Special Mod" />
			</div>
		</div>
	)
}
