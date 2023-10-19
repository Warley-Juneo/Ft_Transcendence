import { GoPersonAdd } from 'react-icons/go';
import { GiThreeFriends } from 'react-icons/gi';
import { FaUserFriends} from 'react-icons/fa';

function Options() {
	return (
		<div className='d-flex align-items-center p-2 text-white'>
			<p className='fw-bold'>Social</p>
			<div className='d-flex justify-content-end w-100 options'>
				<GoPersonAdd style={{margin: '5px'}} size={30}/>
				<FaUserFriends style={{margin: '5px'}} size={30}/>
				<GiThreeFriends style={{margin: '5px'}} size={30}/>
			</div>
		</div>
	)
}

export default Options
