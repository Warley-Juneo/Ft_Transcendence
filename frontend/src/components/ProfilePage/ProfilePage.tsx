import InformationsUser from './Perfil/Perfil';
import MatchHistory from './MatchHistory';
import { IoSettingsOutline } from "react-icons/io5";

import './rank.css'

export default function ProfileScreen() {

	return (
		<div className="row g-0 p-2 bg-custon-roxo rounded h-100 position-relative">
			<div className='col'>
				<IoSettingsOutline
					className="position-absolute top-0 end-0 m-3 text-white"
					type='button'
					size={30}
				/>
				{/* <div className='position-absolute top-0 end-0 h-75 w-75 text-center text-white p-3' style={{ backgroundColor: 'black' }}>
					<h3>Settings Profile</h3>
					<div className='d-flex'>
						<label htmlFor="customRange1" className="form-label me-3">Sound</label>
						<input type="range" className="form-range" id="customRange1"></input>
					</div>
				</div> */}
			</div>
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
