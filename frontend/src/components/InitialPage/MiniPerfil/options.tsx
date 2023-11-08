import { GoPersonAdd } from 'react-icons/go';
import { GiThreeFriends } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const	URLS_MiniPerfilPlayers = {
	'personal': 'http://localhost:3000/users/friends',
	'Global': 'http://localhost:3000/users/online',
}

function Options({getPlayers}: {getPlayers: (route: string) => void}) {
	const [showaADDFriend, setShowAddFriend] = useState(false);

	function handleClickAddFriend() {
		setShowAddFriend(!showaADDFriend);
	}

	function addNewFriend(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			console.log("Fiz a request dale")
			axios.post('http://localhost:3000/users/add_friend', {
				nick_name: event.currentTarget.value,
			}, {
				headers: {
					Authorization: Cookies.get('jwtToken'),
				},
			})
			.then((res) => {
				getPlayers(URLS_MiniPerfilPlayers.personal);
			})
		}
	}

	function returnBlockAddFriend(showBlock: boolean) {
		if (showBlock === false) {
			return null;
		}
		return (
			<div className='rounded'>
				<input
					type='text'
					className='remove-format-input'
					placeholder='Search Friend'
					onKeyDown={addNewFriend}
				/>
			</div>
		)
	}

	return (
		<div className='p-2'>
			<div className='d-flex align-items-center text-white'>
				<p className='fw-bold'>Social</p>
				<div className='d-flex justify-content-end w-100 options'>
					<GoPersonAdd
						style={{ margin: '5px', cursor: 'pointer' }}
						size={30} onClick={handleClickAddFriend}
					/>
					<FaUserFriends
						style={{ margin: '5px', cursor: 'pointer' }}
						size={30} onClick={() => {getPlayers(URLS_MiniPerfilPlayers.personal)}}
					/>
					<GiThreeFriends
						style={{ margin: '5px', cursor: 'pointer' }}
						size={30} onClick={() => getPlayers(URLS_MiniPerfilPlayers.Global)}
					/>
				</div>
			</div>
			{returnBlockAddFriend(showaADDFriend)}
		</div>
	)
}

export default Options
