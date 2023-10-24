import { GoPersonAdd } from 'react-icons/go';
import { GiThreeFriends } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

function Options() {
	const [showaddfriend, setShowAddFriend] = useState(false);

	function handleAddFriend() {
		setShowAddFriend(!showaddfriend);
	}

	return (
		<div className='p-2'>
			<div className='d-flex align-items-center text-white'>
				<p className='fw-bold'>Social</p>
				<div className='d-flex justify-content-end w-100 options'>
					<GoPersonAdd style={{ margin: '5px', cursor: 'pointer' }} size={30} onClick={handleAddFriend} />
					<FaUserFriends style={{ margin: '5px', cursor: 'pointer' }} size={30} />
					<GiThreeFriends style={{ margin: '5px', cursor: 'pointer' }} size={30} />
				</div>
			</div>
			{ showaddfriend === false ? null :
			<div className='rounded'>
				<input type='text' className='remove-format-input' placeholder='Search Friend'/>
			</div> }
		</div>
	)
}

export default Options
