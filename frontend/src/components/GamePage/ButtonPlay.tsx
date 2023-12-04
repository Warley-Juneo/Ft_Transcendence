import playPong from '../../static/game/playPong.jpg'

export default function ButtonPlay(): JSX.Element {
	return (
		// <div style={{ height: '5rem', width: '5rem' }}>
		// 	<div className='h-100'>
		// 		<img className='h-100' src={playPong} alt="playPong" />
		// 	</div>
		// 	<button type="button" className="btn btn-secondary"
		// 		data-bs-toggle="tooltip" data-bs-placement="top"
		// 		data-bs-custom-class="custom-tooltip"
		// 		data-bs-title="This top tooltip is themed via CSS variables.">
		// 		Custom tooltip
		// 	</button>
		// </div>
		<div className='text-white'>
			<button type="button" className="btn btn-secondary"
				data-bs-toggle="tooltip" data-bs-placement="top"
				data-bs-custom-class="custom-tooltip"
				data-bs-title="This top tooltip is themed via CSS variables.">
				Custom tooltip
			</button>
		</div>
	)

}
