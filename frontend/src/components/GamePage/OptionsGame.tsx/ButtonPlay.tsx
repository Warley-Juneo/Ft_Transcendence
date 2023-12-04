type propsButtonPlay = {
	photo: string,
	content: string,
}

export default function ButtonPlay(props: propsButtonPlay): JSX.Element {
	const cssDiv: React.CSSProperties = {
		height: '10rem',
		width: '10rem',
		margin: '1rem',
		backgroundColor: '#666',
		padding: '0.5rem',
		borderRadius: '0.5rem',
	}

	const cssButtonPlay: React.CSSProperties = {
		width: '100%',
		padding: '0.5rem',
		border: 'none',
		// borderBottomLeftRadius: '0.5rem',
		// borderBottomRightRadius: '0.5rem',
		borderRadius: '0.5rem',
		backgroundColor: '#FFD700',
	}

	return (
		<div style={cssDiv}>
			<div style={{height: '7.5rem', marginBottom: '0.5rem'}}>
				<img className='h-100 w-100 rounded' src={props.photo} alt="playPong" />
			</div>
			<button type="button" style={cssButtonPlay}
				data-bs-toggle="tooltip" data-bs-placement="top"
				data-bs-custom-class="custom-tooltip"
				data-bs-title="This top tooltip is themed via CSS variables.">
				{props.content}
			</button>
		</div>
	)

}
