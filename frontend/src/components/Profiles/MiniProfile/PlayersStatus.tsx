import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GoMute } from "react-icons/go";
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
	my_id: string,
	admin: Players[],
	mute: {id: string}[]
	is_active: boolean,
}

export default function Status(props: PropsStatus): JSX.Element {
	console.log("props.mute", props.mute);
	console.log("props.admin", props.admin);

	const cssIcons: React.CSSProperties = {
		marginLeft: '6px',
		marginBottom: '2px'
	}

	const cssSecond: React.CSSProperties = {
		marginLeft: '2px',
		marginBottom: '2px'
	}
	return (
		<div className="p-1">
			<div className="d-flex align-items-end">
				<p>{props.name}</p>
				{!props.mute.find((item) => item.id === props.my_id) ? null :
					<GoMute key={props.my_id + '1'} style={cssIcons}/>
				}
				{!props.admin.find((item) => item.id === props.my_id) ? null :
					<MdOutlineAdminPanelSettings key={props.my_id} style={cssSecond}/>
				}
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
