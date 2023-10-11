import './listGroups.css';
import { AiFillLock } from 'react-icons/ai';

function ListGroups() {
	return (
		<div className='m-5 listGroups'>
			<div className='m-5'>
				<div className='d-flex border align-items-center p-1'>
					<p className='fs-5 me-5'>Bora de Frifas</p>
					<AiFillLock />
				</div>
				<div className='d-flex border align-items-center p-1'>
					<p className='fs-5 me-5'>Bora de Frifas</p>
					<AiFillLock />
				</div>
				<div className='d-flex border align-items-center p-1'>
					<p className='fs-5 me-5'>Bora de Frifas</p>
					<AiFillLock />
				</div>
				<div className='d-flex border align-items-center p-1'>
					<p className='fs-5 me-5'>Bora de Frifas</p>
					<AiFillLock />
				</div>
			</div>
		</div>
	);
}

export default ListGroups;
