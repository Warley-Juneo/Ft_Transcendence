import InformationsUser from './InformationsUser';
import MatchHistory from './MatchHistory';
import './rank.css'

function ProfileScreen() {
	return (
		<div className="row g-0 h-100 bg-custon-roxo rounded p-2">
			<div className='col-2'>
				<InformationsUser />
			</div>
			<div className='col-10 text-white h-100'>
				<div className='p-5 h-100'>
					<h2 className='fst-italic'>PARTIDAS RECENTES</h2>
					<div className='d-flex flex-column overflow-auto h-100' id='MatchHistory'>
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
						<MatchHistory />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
