import InformationsUser from './InformationsUser';
import MatchHistory from './MatchHistory';
import './rank.css'

function ProfileScreen() {
	return (
		<div className="row p-2 g-0 bg-custon-roxo h-100">
			<div className='col-2'>
				<InformationsUser />
			</div>
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
