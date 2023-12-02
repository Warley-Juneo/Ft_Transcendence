import React from "react";

const cssOnlineBorder : React.CSSProperties = {
	backgroundColor: 'rgb(10, 235, 10)',
	borderRadius: '50%',
	height: '12px',
	width: '12px',
	marginRight: '5px',
};

const cssOnline : React.CSSProperties = {
	backgroundColor: '#009000',
	borderRadius: '50%',
	height: '8px',
	width: '8px',
};

const CSSOfflineBorder : React.CSSProperties = {
	...cssOnlineBorder,
	backgroundColor: '#d3d3d3',
};

const CSSOffline : React.CSSProperties = {
	...cssOnline,
	backgroundColor: '#666',

};

export function StatusOnline(name: string): JSX.Element {
	return (
		<div className="p-1">
			<p>{name}</p>
			<div className='d-flex align-items-center'>
				<div style={cssOnlineBorder}
					className='d-flex justify-content-center align-items-center'>
					<div style={cssOnline}></div>
				</div>
				<p>Online</p>
			</div>
		</div>
	);
}

export function StatusOffline(name: string): JSX.Element {
	return (
		<div className="p-1">
			<p>{name}</p>
			<div className='d-flex align-items-center'>
				<div style={CSSOfflineBorder}
					className='d-flex justify-content-center align-items-center'>
					<div style={CSSOffline}></div>
				</div>
				<p>Online</p>
			</div>
		</div>
	);

}
