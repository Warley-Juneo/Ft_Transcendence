import faixa1 from '../../../static/faixas/faixa1.svg'
import faixa2 from '../../../static/faixas/faixa2.svg'
import faixa3 from '../../../static/faixas/faixa3.svg'
import faixa4 from '../../../static/faixas/faixa4.svg'
import faixa5 from '../../../static/faixas/faixa5.svg'
import faixa6 from '../../../static/faixas/faixa6.svg'
import PhotoItemsStore from './PhotoItemsStore'


export default function ItemsStore() : JSX.Element {
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
				<PhotoItemsStore	photo={faixa1}
					explanation="Modelo casual sem perca ou ganhos de prontos"
					id="normalPong"
					price={5}
				/>
				<PhotoItemsStore	photo={faixa2}
					explanation="Modelo ranqueado valendo pontos"
					id="ranquedPong"
					price={10}

				/>
				<PhotoItemsStore	photo={faixa3}
					explanation="Modelo normal contra bot"
					id="contraBotPong"
					price={15}

				/>
			</div>
			<div className="d-flex p-3">
				<PhotoItemsStore	photo={faixa4}
					explanation="Modelo casual com poderes adicionados no mapa para uma melhor diversão "
					id="normalSpecialPong"
					price={20}

				/>
				<PhotoItemsStore	photo={faixa5}
					explanation="Modelo com powers Ranqueado valendo pontos"
					id="ranquedSpecialPong"
					price={25}

				/>
				<PhotoItemsStore	photo={faixa6}
					explanation="Modelo com powers contra bot"
					id="contraBotSpecialPong"
					price={30}

				/>
			</div>
		</div>
	)
}
