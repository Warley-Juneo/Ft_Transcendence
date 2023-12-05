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
				<PhotoMode	photo={playPong}
					content="Normal"
					explanation="Modelo casual sem perca ou ganhos de prontos"
					id="normalPong"
				/>
				<PhotoMode	photo={playPong}
					content="Ranqueado"
					explanation="Modelo ranqueado valendo pontos"
					id="ranquedPong"
				/>
			</div>
			<div className="d-flex p-3">
				<PhotoMode	photo={playSpecialPong}
					content="Normal"
					explanation="Modelo casual com poderes adicionados no mapa para uma melhor diversão "
					id="normalSpecialPong"
				/>
				<PhotoMode	photo={playSpecialPong}
					content="Ranqueado"
					explanation="Modelo com powers Ranqueado valendo pontos"
					id="ranquedSpecialPong"
				/>
			</div>
			<div className="d-flex p-3">
				<PhotoMode	photo={playPong}
					content="VS COOP"
					explanation="Modelo normal contra bot"
					id="contraBotPong"
				/>
				<PhotoMode	photo={playSpecialPong}
					content="VS COOP"
					explanation="Modelo com powers contra bot"
					id="contraBotSpecialPong"
				/>
			</div>
		</div>
	)
}
