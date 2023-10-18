import InformationsUser from './InformationsUser';
import MatchHistory from './MatchHistory';
import './rank.css'

function ProfileScreen() {
	return (
		<div className="row h-100 p-3 g-0">
			<InformationsUser />
			<div className='col-9 text-white ms-auto' id='MatchHistory'>
				<h2 className='fst-italic'>PARTIDAS RECENTES</h2>
				<MatchHistory />
				<MatchHistory />
				<MatchHistory />
				<MatchHistory />
			</div>
		</div>
	);
}

export default ProfileScreen;
