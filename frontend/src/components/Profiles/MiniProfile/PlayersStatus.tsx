import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Players } from "./ListFriends";

const cssOnlineBorder: React.CSSProperties = {
	backgroundColor: 'rgb(10, 235, 10)',
	borderRadius: '50%',
	height: '12px',
	width: '12px',
	marginRight: '5px',
};

const cssOnline: React.CSSProperties = {
	backgroundColor: '#009000',
	borderRadius: '50%',
	height: '8px',
	width: '8px',
};

const CSSOfflineBorder: React.CSSProperties = {
	...cssOnlineBorder,
	backgroundColor: '#d3d3d3',
};

const CSSOffline: React.CSSProperties = {
	...cssOnline,
	backgroundColor: '#666',

};

type PropsStatus = {
	name: string,
	id: string,
	admin: Players[],
	is_active: boolean,
}

export default function Status(props: PropsStatus): JSX.Element {

	return (
		<div className="p-1">
			<div className="d-flex align-items-center">
				<p>{props.name}</p>
				{props.admin.map((adm: Players) => {
					if (adm.id === props.id) {
						return <MdOutlineAdminPanelSettings key={props.id}/>
					}
				})}
			</div>
			{props.is_active ? (
				<div className='d-flex align-items-center'>
					<div style={cssOnlineBorder}
						className='d-flex justify-content-center align-items-center'>
						<div style={cssOnline}></div>
					</div>
					<p>Online</p>
				</div>
			)
				: (
					<div className='d-flex align-items-center'>
						<div style={CSSOfflineBorder}
							className='d-flex justify-content-center align-items-center'>
							<div style={CSSOffline}></div>
						</div>
						<p>Online</p>
					</div>
				)
			}
		</div>
	);
}
