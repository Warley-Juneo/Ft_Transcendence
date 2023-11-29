
const cssDetails: React.CSSProperties = {
	fontSize: '11px',
}
const cssDetailsHidden: React.CSSProperties = {
	...cssDetails,
	visibility: 'hidden',
}
type propsMessageUser = {
	content: string,
	avatarUrl: string,
	dataFormating: string,
}

export default function MessageUser(props: propsMessageUser): JSX.Element {
	return (
		<div className='d-flex mb-2 justify-content-end'>
			<div className='bg-light rounded me-2 p-2' style={{ whiteSpace: 'pre-line' }}>
				<div className="d-flex">
					<p>{props.content}</p>
					<p className="me-2" style={cssDetailsHidden}>{props.dataFormating}</p>
				</div>
				<p className="d-flex justify-content-end" style={cssDetails}>{props.dataFormating}</p>
			</div>
			<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={props.avatarUrl} alt='foto' />
		</div>
	)
}
