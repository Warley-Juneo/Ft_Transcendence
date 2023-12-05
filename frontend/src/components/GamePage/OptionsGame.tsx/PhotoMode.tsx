type propsButtonPlay = {
	photo: string,
	content: string,
}

export default function PhotoMode(props: propsButtonPlay): JSX.Element {
	const cssDiv: React.CSSProperties = {
		height: '8rem',
		width: '8rem',
		margin: '1rem',
		backgroundColor: '#666',
		padding: '0.5rem',
		borderRadius: '0.5rem',
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
		<div style={cssDiv}>
			<div style={cssPhoto}>
				<img className='h-100 w-100 rounded' src={props.photo} alt="playPong" />
			</div>
			<button type="button" style={cssButton}
				data-bs-toggle="tooltip" data-bs-placement="top"
				data-bs-custom-class="custom-tooltip"
				data-bs-title="This top tooltip is themed via CSS variables.">
				{props.content}
			</button>
		</div>
	)

}
