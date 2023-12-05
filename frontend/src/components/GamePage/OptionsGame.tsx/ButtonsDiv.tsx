import ButtonPlay from "../OptionsGame.tsx/ButtonPlay";
import playPong from '../../../static/game/playPong.jpg'
import playSpecialPong from '../../../static/game/playSpecialPong.jpg'

export default function ButtonDiv() : JSX.Element {
	const cssDivFilhoSelectGame: React.CSSProperties = {
		position: 'relative',
		zIndex: 2,

		backgroundColor: '#ed9121',
		borderRadius: '1rem',
		boxShadow: '1px 2px 2px black inset, 0px -2px 2px #FFF inset',
		opacity: '1 !important',
	}

	return (
		<div style={cssDivFilhoSelectGame}>
			<div className="d-flex p-3" id='divOptionsStartGame'>
				<ButtonPlay photo={playPong} content="Normal Classico" />
				<ButtonPlay photo={playPong} content="Ranqued Classico" />
			</div>
			<div className="d-flex p-3">
				<ButtonPlay photo={playSpecialPong} content="Normal Power" />
				<ButtonPlay photo={playSpecialPong} content="Ranqued Power" />
			</div>
		</div>
	)
}
