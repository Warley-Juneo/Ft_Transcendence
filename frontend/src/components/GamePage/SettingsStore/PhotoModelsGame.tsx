import { useState } from "react"
import { Tooltip } from 'react-tooltip'
import {ReactComponent as UnicCoin} from '../../../static/game/unicCoin.svg'
import BordaItems from '../../../static/game/bordaLojaPlata.svg'

type propsButtonPlay = {
	photo: string,
	explanation: string,
	id: string,
	price: number,
}

export default function PhotoModelsGame(props: propsButtonPlay): JSX.Element {
	const [isHover, setIsHover] = useState(false)
	const cssDiv: React.CSSProperties = {
		height: '10rem',
		width: '10rem',
		margin: '1rem',
		padding: '0.5rem',
		borderRadius: '0.5rem',
		transition: 'all 0.5s',
		backgroundColor: '#666',
		boxShadow: '2px 2px 10px black inset, -2px -2px 10px #FFF inset',
		transform: isHover ? 'scale(1.1)' : 'scale(1)',
		backgroundImage: `url(${BordaItems})`,
		backgroundSize: '100% 100%',

	}

	const cssPhoto: React.CSSProperties = {
		height: '4rem', //4.5
		width: '100%',
		marginBottom: '0.5rem',
		borderRadius: '0.5rem',
	}

	const cssDivPrice: React.CSSProperties = {
		height: '2rem',
		marginBottom: '0.5rem',
		border: '1px solid #ffbf00',

		fontWeight: 'bold',

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}

	const cssButton: React.CSSProperties = {
		width: '100%',
		height: '5rem',
		border: 'none',
		borderRadius: '0.5rem',
		backgroundColor: 'transparent',
		backgroundImage: `url(${props.photo})`,
		backgroundSize: '100% 100%',

	}

	return (
		<>
			<Tooltip id={props.id} place="top">{props.explanation}</Tooltip>
			<div style={cssDiv}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				data-tooltip-id={props.id}
			>
				<div style={cssPhoto}>
					<img className='h-100 w-100 rounded' src={props.photo} alt="playPong" />
				</div>
				<div style={cssDivPrice}>
					<p>{props.price}</p>
					<UnicCoin style={{height: '2rem'}}/>
				</div>
				<button type="button" style={cssButton}>
					Buy
				</button>
			</div>
		</>
	)

}
