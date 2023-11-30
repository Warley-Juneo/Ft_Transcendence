import Bar from "./Bar"
import InfosUser from "./InfosUser";
import MatchHistory from "../ProfilePage/MatchHistory";

type propsDinamicProfile = {
	nickName: string;
	dinamicProfile: React.Dispatch<React.SetStateAction<{
		show: boolean,
		nickName: string
	}>>
}

export default function DinamicProfile(props: propsDinamicProfile): JSX.Element {
	return (
		<div className="text-white top-0 end-0 position-absolute h-75 p-2 bg-degrader">
			<div className="d-flex flex-column h-100">
			<Bar dinamicProfile={props.dinamicProfile}/>
				<InfosUser nickName={props.nickName} />
			<div className='overflow-auto h-100 '>
				<div className="p-3 rounded h-100" id="MatchHistory">
					<MatchHistory userId={dataUser.id}/>
				</div>
			</div>
			</div>
		</div>
	)
}
