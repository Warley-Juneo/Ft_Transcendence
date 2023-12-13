import Bar from "./Bar"
import InfosUser from "./InfosUser";
import MatchHistory from "../ProfilePage/MatchHistory";
import '../ProfilePage/rank.css'
type propsDinamicProfile = {
	nickName: string;
	id: string;
	openDinamicProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DinamicProfile(props: propsDinamicProfile): JSX.Element {
	return (
		<div className="text-white position-absolute top-0 start-50 h-75 w-75 p-2 bg-degrader ">
			<div className="d-flex flex-column h-100 position-relative">
				<Bar openDinamicPerfil={props.openDinamicProfile} />
				<div style={{height: '35%'}}>
					<InfosUser nickName={props.nickName} />
				</div>
				<div className='overflow-auto h-100 '>
					<div className="p-3 rounded h-100" id="MatchHistory">
						<MatchHistory userId={props.id} />
					</div>
				</div>
			</div>
		</div>
	)
}
