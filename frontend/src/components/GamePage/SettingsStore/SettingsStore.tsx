import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ShowItemsStore from "./ShowItemsStore";
import FakeApiStore from "./FakeApiStore";

export default function SettingsStore(): JSX.Element {
	const [barPerfil, setBarPerfil] = useState(true)

	const cssButtonClosed: React.CSSProperties = {
		position: 'absolute',
		top: '0',
		right: '-0.6rem',
		zIndex: 3,

		height: '3rem',
		width: '3rem',
		borderRadius: '0.5rem',
		backgroundColor: '#9400d3',
		boxShadow: '2px 2px 1px #FFF inset, -8px -8px 8px #9400d3 inset',

		cursor: 'pointer',
	}

	const ButtonBarPerfil: React.CSSProperties = {
		color: 'white',
		padding: '1rem',
		marginLeft: '1.5rem',
		marginBottom: barPerfil ? '0' : '0.5rem	',

		fontWeight: 'bold',
		fontSize: '1.5rem',

		border: 'none',
		borderTopLeftRadius: '1rem',
		borderTopRightRadius: '1rem',
		backgroundColor: '#7600a8',
		boxShadow: '6px 4px 2px #9400d3 inset, 2px 0px 2px #9400d3',
	}

	const ButtonBarGame: React.CSSProperties = {
		...ButtonBarPerfil,
		marginLeft: '1rem',
		marginBottom: barPerfil ? '0.5rem	' : '0',
	}

	const firtdivSelectGame: React.CSSProperties = {
		position: 'relative',
		backgroundColor: '#9400d3',
		padding: '1.3rem',
		borderRadius: '1.5rem',
		color: 'white',
	}

	const principaldivSelectGame: React.CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1,

		height: 'calc(100% + 0.5rem)',
		width: '100%',
		marginLeft: '0.5rem',
		borderRadius: '1.5rem',
		opacity: 0.7,
		backgroundColor: '#7600a8',
	}

	return (
		<div className="m-auto">
			<div className="d-flex">
				<button
					style={ButtonBarPerfil}
					onClick={() => setBarPerfil(true)}
				>
					Bar Perfil
				</button>
				<button
					style={ButtonBarGame}
					onClick={() => setBarPerfil(false)}
				>
					Bar Game
				</button>
			</div>
			<div style={firtdivSelectGame}>
				<IoMdClose style={cssButtonClosed} />
				{barPerfil ? <ShowItemsStore items={FakeApiStore('skinsBar')} /> :
					<ShowItemsStore items={FakeApiStore('skinsGame')} />
				}
				<div style={principaldivSelectGame}></div>
			</div>
		</div>
	)
}
