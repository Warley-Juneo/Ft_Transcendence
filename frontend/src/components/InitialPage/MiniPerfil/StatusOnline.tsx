export default function StatusOnline(name: string) {
	return (
		<div className="p-1">
			<p>{name}</p>
			<div className='d-flex align-items-center'>
				<div style={{ backgroundColor: 'rgb(10, 235, 10)', borderRadius: '50%', height: '11px', width: '11px', marginRight: '5px' }}
					className='d-flex justify-content-center align-items-center'>
					<div style={{ backgroundColor: 'green', borderRadius: '50%', height: '8px', width: '8px' }}></div>
				</div>
			<p style={{fontSize: '0.852rem'}}>Online</p>
			</div>
		</div>
	);
}
