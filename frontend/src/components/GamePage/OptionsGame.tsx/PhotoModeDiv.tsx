import PhotoMode from "./PhotoMode";
import playPong from '../../../static/game/playPong.jpg'
import playSpecialPong from '../../../static/game/playSpecialPong.jpg'

export default function PhotoModeDiv() : JSX.Element {
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
				<PhotoMode photo={playPong} content="Normal " />
				<PhotoMode photo={playPong} content="Ranqueado" />
			</div>
			<div className="d-flex p-3">
				<PhotoMode photo={playSpecialPong} content="Normal " />
				<PhotoMode photo={playSpecialPong} content="Ranqueado" />
			</div>
			<div className="d-flex p-3">
				<PhotoMode photo={playPong} content="VS COOP" />
				<PhotoMode photo={playSpecialPong} content="VS COOP" />
			</div>
		</div>
	)
}
