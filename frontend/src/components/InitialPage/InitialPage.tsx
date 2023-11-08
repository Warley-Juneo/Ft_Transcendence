import { Outlet } from 'react-router-dom';
import MiniPerfil from './MiniPerfil/MiniPerfil';
import BarOptions from './barOptions/BarOptions';


export default function InicialPage() {
	return (
		<div className='row g-0 border' id='home-screen' style={{height: '100vh', width: '99vw'}}>
			<main className='col-9' id='left-screen'>
				<BarOptions />
				<hr className='m-0 text-white'></hr>
				<div className='p-3 rounded' id='dinamicScreen' style={{height: '85vh'}}>
					<Outlet />
				</div>
			</main>
			<aside className='col-3' id='right-screen'>
				{<MiniPerfil />}
			</aside>
		</div>
	);
}
