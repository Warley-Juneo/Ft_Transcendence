import InformationsUser from './InformationsUser';
import MatchHistory from './MatchHistory';
import './rank.css'

export default function ProfileScreen() {
	return (
			<div className="row g-0 p-2 bg-custon-roxo rounded h-100">
				<div className='col-md-3 col-lg-2'>
					<InformationsUser />
				</div>
				<div className='col-md-9 col-lg-10 text-white d-flex flex-column h-100 p-5'>
					<h2 className='fst-italic ps-3 faixa-amarela'>PARTIDAS RECENTES</h2>
					<div className='overflow-auto' id='MatchHistory'>
						<MatchHistory />
					</div>
				</div>
			</div>
	);
}
