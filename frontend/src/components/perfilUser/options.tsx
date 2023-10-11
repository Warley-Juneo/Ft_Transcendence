import { GoPersonAdd } from 'react-icons/go';
import { GiThreeFriends } from 'react-icons/gi';
import { FaUserFriends} from 'react-icons/fa';
import './styles/options.css'

function Options() {
	return (
		<div className='d-flex align-items-center p-2'>
			Social
			<div className='d-flex justify-content-end w-100 options'>
				<FaUserFriends className='options' size={30}/>
				<GiThreeFriends className='options' size={30}/>
				<GoPersonAdd className='options' size={30}/>
			</div>
		</div>
	)
}

export default Options
