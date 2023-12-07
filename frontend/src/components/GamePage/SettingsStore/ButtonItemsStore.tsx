import { useContext, useState } from "react"
import { ReactComponent as UnicCoin } from '../../../assets/store/unicCoin.svg'
import BordaItems from '../../../assets/store/bordaLojaPlata.svg'
import { UserData } from "../../InitialPage/Contexts/Contexts"

type propsButtonPlay = {
	photo: string,
	explanation: string,
	id: string,
	price: number,
}

export default function ButtonsItemsStore(props: propsButtonPlay): JSX.Element {
	const [isHover, setIsHover] = useState(false)
	const userData = useContext(UserData)

	const cssDiv: React.CSSProperties = {
		height: '8rem',
		width: '8rem',
		margin: '1rem',
		marginTop: '0',
		padding: '0.5rem',
		borderRadius: '0.5rem',
		transition: 'all 0.5s',
		backgroundColor: '#9400d3',
		boxShadow: '2px 2px 10px #FFF inset, -2px -2px 10px black inset',
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
		height: '1.5rem',
		marginBottom: '0.5rem',
		border: '1px solid #ffbf00',

		fontWeight: 'bold',

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}

	const cssButton: React.CSSProperties = {
		width: '100%',
		height: '2rem',
		border: 'none',
		borderRadius: '0.5rem',
		backgroundColor: 'transparent',
		backgroundImage: `url(${props.photo})`,
		backgroundSize: '100% 100%',
	}

	const buyBar = (itemData: propsButtonPlay) => {
		if (itemData.price > userData.user.coins) {
			alert("You don't have enough coins")
			return
		}

	}
	return (
		<div style={cssDiv}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<div style={cssPhoto}>
				<img className='h-100 w-100 rounded' src={props.photo} alt="playPong" />
			</div>
			<div style={cssDivPrice}>
				<p>{props.price}</p>
				<UnicCoin style={{ height: '2rem' }} />
			</div>
			<button type="button" style={cssButton} onClick={() => {buyBar(props)}}>
				<p className="fw-bold">Buy</p>
			</button>
		</div>
	)
}
