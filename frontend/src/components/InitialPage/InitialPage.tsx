import { Outlet } from 'react-router-dom';
import MiniPerfil from './MiniPerfil/MiniPerfil';
import BarOptions from './barOptions/BarOptions';


export default function InicialPage() {
	return (
		<div className='d-flex' id='home-screen' style={{maxHeight: '100vh'}}>
			<div className='w-100' id='left-screen'>
				<BarOptions />
				<hr className='m-0 text-white'></hr>
				<div className='p-3 rounded' id='dinamicScreen' style={{height: '85vh'}}>
					<Outlet />
				</div>
			</div>
			<div style={{height: '100vh'}}>
				{<MiniPerfil />}
			</div>
		</div>
	);
}
