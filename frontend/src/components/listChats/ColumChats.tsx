import { BiSolidLock } from 'react-icons/bi';

export default function ColumChats() {
	return (
		<div id='showChats' className='p-2 opacity-75 d-flex'>
			<div className='div-infos-chat p-2'>
				<div className='d-flex flex-column'>
					<p className='fs-5 me-2'>Aonde e o Bar?</p>
					<div className='d-flex'>
						<p className='me-2'>Onlines: 5</p>
						<BiSolidLock />
					</div>
				</div>
				<div className='text-center'>
					<h6>Dono do Grupo</h6>
					<p>Zoro</p>
				</div>
			</div>
			<div className='div-infos-chat p-2'>
				<div className='d-flex flex-column'>
					<p className='fs-5 me-2'>Cassinho online ONLINE</p>
					<div className='d-flex'>
						<p className='me-2'>Onlines: 15</p>
						<BiSolidLock />
					</div>
				</div>
				<div className='text-center'>
					<h6>Dono do Grupo</h6>
					<p>Nami</p>
				</div>
			</div>
			<div className='div-infos-chat p-2'>
				<div className='d-flex flex-column'>
					<p className='fs-5 me-2'>Assistindo Master Chef</p>
					<div className='d-flex'>
						<p className='me-2'>Onlines: 5</p>
						<BiSolidLock />
					</div>
				</div>
				<div className='text-center'>
					<h6>Dono do Grupo</h6>
					<p>Sanji</p>
				</div>
			</div>
		</div>
	);
}
