import { useState } from "react"
import { Tooltip } from 'react-tooltip'

type propsButtonPlay = {
	photo: string,
	content: string,
	explanation: string,
	id: string,
}

export default function PhotoMode(props: propsButtonPlay): JSX.Element {
	const [isHover, setIsHover] = useState(false)
	const cssDiv: React.CSSProperties = {
		height: '8rem',
		width: '8rem',
		margin: '1rem',
		backgroundColor: '#666',
		padding: '0.5rem',
		borderRadius: '0.5rem',
		transition: 'all 0.5s',
		transform: isHover ? 'scale(1.1)' : 'scale(1)',
	}

	const cssPhoto: React.CSSProperties = {
		height: '80%',
		width: '100%',
		marginBottom: '0.5rem',
		borderRadius: '0.5rem',
	}

	const cssButton: React.CSSProperties = {
		width: '100%',
		height: '40%',
		border: 'none',
		borderRadius: '0.5rem',
		backgroundColor: '#ffbf00',
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
				<button type="button" style={cssButton}>
					{props.content}
				</button>
			</div>
		</>
	)

}
