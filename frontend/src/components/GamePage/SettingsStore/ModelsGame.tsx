import faixa1 from '../../../static/faixas/faixa1.svg'
import faixa2 from '../../../static/faixas/faixa2.svg'
import faixa3 from '../../../static/faixas/faixa3.svg'
import faixa4 from '../../../static/faixas/faixa4.svg'
import faixa5 from '../../../static/faixas/faixa5.svg'
import faixa6 from '../../../static/faixas/faixa6.svg'
import PhotoModelsGame from './PhotoModelsGame'


export default function ModelsGame() : JSX.Element {
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
				<PhotoModelsGame	photo={faixa1}
					explanation="Modelo casual sem perca ou ganhos de prontos"
					id="normalPong"
					price={5}
				/>
				<PhotoModelsGame	photo={faixa2}
					explanation="Modelo ranqueado valendo pontos"
					id="ranquedPong"
					price={10}

				/>
				<PhotoModelsGame	photo={faixa3}
					explanation="Modelo normal contra bot"
					id="contraBotPong"
					price={15}

				/>
			</div>
			<div className="d-flex p-3">
				<PhotoModelsGame	photo={faixa4}
					explanation="Modelo casual com poderes adicionados no mapa para uma melhor diversão "
					id="normalSpecialPong"
					price={20}

				/>
				<PhotoModelsGame	photo={faixa5}
					explanation="Modelo com powers Ranqueado valendo pontos"
					id="ranquedSpecialPong"
					price={25}

				/>
				<PhotoModelsGame	photo={faixa6}
					explanation="Modelo com powers contra bot"
					id="contraBotSpecialPong"
					price={30}

				/>
			</div>
		</div>
	)
}
