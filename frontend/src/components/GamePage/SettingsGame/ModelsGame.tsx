import ButtonModelsGame from "./ButtonModelsGame";
import playPong from '../../../assets/settingsGame/playPong.jpg'
import playSpecialPong from '../../../assets/settingsGame/playSpecialPong.jpg'
import bgFire from "../../../assets/game/backgroundFire.jpg";


export default function ModelsGame() : JSX.Element {
	const cssDivFilhoSelectGame: React.CSSProperties = {
		position: 'relative',
		zIndex: 2,

		backgroundColor: '#ed9121',
		borderRadius: '1rem',
		boxShadow: '1px 2px 2px black inset, 0px -2px 2px #FFF inset',
		opacity: '1 !important',
		backgroundImage: `url(${bgFire})`,
		backgroundSize: 'cover',
	}

	return (
		<div style={cssDivFilhoSelectGame}>
			<div className="d-flex p-3" id='divOptionsStartGame'>
				<ButtonModelsGame	photo={playPong}
					content="Normal"
					explanation="Modelo casual sem perca ou ganhos de prontos"
					id="normalPong"
				/>
				<ButtonModelsGame	photo={playPong}
					content="Ranqueado"
					explanation="Modelo ranqueado valendo pontos"
					id="ranquedPong"
				/>
				<ButtonModelsGame	photo={playPong}
					content="VS COOP"
					explanation="Modelo normal contra bot"
					id="contraBotPong"
				/>
			</div>
			<div className="d-flex p-3">
				<ButtonModelsGame	photo={playSpecialPong}
					content="Normal"
					explanation="Modelo casual com poderes adicionados no mapa para uma melhor diversão "
					id="normalSpecialPong"
				/>
				<ButtonModelsGame	photo={playSpecialPong}
					content="Ranqueado"
					explanation="Modelo com powers Ranqueado valendo pontos"
					id="ranquedSpecialPong"
				/>
				<ButtonModelsGame	photo={playSpecialPong}
					content="VS COOP"
					explanation="Modelo com powers contra bot"
					id="contraBotSpecialPong"
				/>
			</div>
		</div>
	)
}
