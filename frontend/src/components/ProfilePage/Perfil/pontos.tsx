type propsPointer = {
	wins: number,
	loses: number,
	draws: number,
	kda: number,
	borderWrite: string,
	pointers: number
}

export default function Pointer(props: propsPointer): JSX.Element {
	return (
		<div className={props.borderWrite} style={props.pointers > 15 ? { height: '200px' } : { height: '150px' }}>
			<p className='fw-bold me-2'>VT<br></br>{props.wins}</p>
			<p className='fw-bold me-2'>DR<br></br>{props.loses}</p>
			<p className='fw-bold me-2'>EPT<br></br>{props.draws}</p>
			<p className='fw-bold'>KDA<br></br>{props.kda}</p >
		</div>
	)
}
