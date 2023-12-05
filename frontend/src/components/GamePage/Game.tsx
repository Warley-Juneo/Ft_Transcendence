import React from "react";
import Coins from "./Coins";
import { CgCloseR } from "react-icons/cg";
import ButtonDiv from "./OptionsGame.tsx/ButtonsDiv";
import { IoMdClose } from "react-icons/io";

export default function Game(): JSX.Element {
	const cssButtonClosed: React.CSSProperties = {
		position: 'absolute',
		top: '0',
		right: '-1rem',
		zIndex: 4,

		height: '3rem',
		width: '3rem',
		borderRadius: '0.5rem',
		backgroundColor: '#ffbf00',
		boxShadow: '2px 2px 1px #FFF inset, -8px -8px 8px #ed9121 inset',
	}

	const ButtonSelected: React.CSSProperties = {
		marginLeft: '1.5rem',
		padding: '1rem',
		color: 'white',
		fontSize: '1.5rem',
		fontWeight: 'bold',

		border: 'none',
		borderTopLeftRadius: '1rem',
		borderTopRightRadius: '1rem',
		backgroundColor: '#ed9121',
		boxShadow: '6px 4px 2px #ffbf00 inset, 2px 0px 2px #ffbf00',
	}

	const ButtonUnselected: React.CSSProperties = {
		...ButtonSelected,
		marginLeft: '1rem',
		borderRadius: '1rem',
		marginBottom: '0.5rem',
	}

	const firtdivSelectGame: React.CSSProperties = {
		position: 'relative',
		backgroundColor: '#ffbf00',
		padding: '1.3rem',
		borderRadius: '1.5rem',
	}

	const principaldivSelectGame: React.CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,

		height: 'calc(100% + 0.5rem)',
		width: '100%',
		marginLeft: '0.5rem',
		borderRadius: '1.5rem',
		opacity: 0.8,
		backgroundColor: '#ed9121',
	}
	return (
		<div className="h-100 bg-custon-roxo rounded text-white position-relative p-3">
			<Coins />
			<div className="row g-0">
				<div className="col-12 col-lg-4 col-md-6" id="settingsStartGame">
					<div className="d-flex m-0">
						<button style={ButtonSelected}>Game</button>
						<button style={ButtonUnselected}>Rounds</button>
					</div>
					<div style={firtdivSelectGame} >
						<IoMdClose style={cssButtonClosed} />
						<ButtonDiv />
						<div style={principaldivSelectGame}></div>
					</div>
				</div>
			</div>
			{/* <div className="d-flex">
				<div className="d-flex w-100 p-3" id='divOptionsStartGame'>
				<ButtonPlay photo={numberFive} content="5 Rounds" />
				<ButtonPlay photo={numberTen} content="10 Rounds" />
				</div>
			</div> */}
		</div>
	)
}
