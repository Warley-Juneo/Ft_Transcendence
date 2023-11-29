
const cssDetails: React.CSSProperties = {
	fontSize: '11px',
}
const cssDetailsHidden: React.CSSProperties = {
	...cssDetails,
	visibility: 'hidden',
}
type propsMessagePeople = {
	content: string,
	avatarUrl: string,
	dataFormating: string,
	nickname: string,
}

export default function MessagePeople(props: propsMessagePeople): JSX.Element {
	return (
		<div className='d-flex mb-2'>
			<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={props.avatarUrl} alt='foto' />
			<div className='bg-light rounded ms-2 p-2' style={{ whiteSpace: 'pre-line' }}>
				<p>{props.nickname}</p>
				<div className="d-flex">
					<p>{props.content}</p>
					<p className="ms-2" style={cssDetailsHidden}>{props.dataFormating}</p>
				</div>
				<p className="d-flex justify-content-end" style={cssDetails}>{props.dataFormating}</p>
			</div>
		</div>
	)
}
