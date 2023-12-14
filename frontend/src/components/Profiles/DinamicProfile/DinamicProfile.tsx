import InfosUser from "./InfosUser";
import MatchHistory from "../ProfilePage/MatchHistory";
import '../ProfilePage/rank.css'
import ButtonClosed from "../../GamePage/Game/ButtonClosed";
import bgTerra from '../../../assets/game/planets/backgrounds/bgTerra.jpg'

type propsDinamicProfile = {
	nickName: string;
	id: string;
	openDinamicProfile: React.Dispatch<React.SetStateAction<string>>;
}

export default function DinamicProfile(props: propsDinamicProfile): JSX.Element {
	const cssBackgroundTerra = {
		backgroundImage: `url(${bgTerra})`,
		backgroundSize: 'cover',
		backgroundPosition: 'contain',
		backgroundRepeat: 'no-repeat',
	}

	return (
		<div className="text-white h-75 w-75 p-2 bg-degrader position-absolute top-50 start-50 translate-middle" style={cssBackgroundTerra}>
			<div className="d-flex flex-column h-100 position-relative">
				<ButtonClosed backgroundColor="" backgroundShadow="" closed={props.openDinamicProfile} />
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
