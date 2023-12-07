import ModelsGame from "./ModelsGame";
import { IoMdClose } from "react-icons/io";

export default function SettingsPath(): JSX.Element {
	const cssButtonClosed: React.CSSProperties = {
		position: 'absolute',
		top: '0',
		right: '-0.6rem',
		zIndex: 3,

		height: '3rem',
		width: '3rem',
		borderRadius: '0.5rem',
		backgroundColor: '#ffbf00',
		boxShadow: '2px 2px 1px #FFF inset, -8px -8px 8px #ed9121 inset',

		cursor: 'pointer',
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
		marginBottom: '2px',
		borderBottomLeftRadius: '0.5rem',
		borderBottomRightRadius: '0.5rem',
	}

	const firtdivSelectGame: React.CSSProperties = {
		position: 'relative',
		backgroundColor: '#ffbf00',
		padding: '1.3rem',
		borderRadius: '1.5rem',
		color: 'white',
		height: "100%"
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
		backgroundColor: '#ed9121',
	}

	return (
		<div className="h-100">
			<button style={ButtonSelected}>Settings</button>
			<div style={firtdivSelectGame}>
				<IoMdClose style={cssButtonClosed} />
				<ModelsGame />
				<div style={principaldivSelectGame}></div>
			</div>
		</div>
	)
}
