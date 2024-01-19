// import { GiThreeFriends } from 'react-icons/gi';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserFriends } from 'react-icons/fa';
import { MdPersonRemoveAlt1, MdPersonAddAlt1 } from "react-icons/md";

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const URLS_MiniPerfilPlayers = {
	'personal': `${process.env.REACT_APP_HOST_URL}/users/friends`,
	'Global': `${process.env.REACT_APP_HOST_URL}/users/find-all`,
}

function Options({ getPlayers }: { getPlayers: (route: string) => void }) {
	const [showADDFriend, setShowAddFriend] = useState(false);
	const [showDLTFriend, setShowDLTFriend] = useState(false);


	function addNewFriend(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			axios.post(`${process.env.REACT_APP_HOST_URL}/users/add_friend`, {
				nick_name: event.currentTarget.value,
			}, {
				headers: {
					Authorization: Cookies.get('jwtToken'),
					"ngrok-skip-browser-warning": "69420"
				},
			})
				.then((res) => {
					getPlayers(URLS_MiniPerfilPlayers.personal);
				})
		}
	}

	function DeleteFriend(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			axios.post(`${process.env.REACT_APP_HOST_URL}/users/delete_friend`, {
				nick_name: event.currentTarget.value,
			}, {
				headers: {
					Authorization: Cookies.get('jwtToken'),
					"ngrok-skip-browser-warning": "69420"
				},
			})
				.then((res) => {
					getPlayers(URLS_MiniPerfilPlayers.personal);
				})
		}
	}

	function returnInput(func: (event: React.KeyboardEvent<HTMLInputElement>) => void) {
		return (
			<div className='rounded'>
				<input
					type='text'
					className='remove-format-input'
					placeholder='Search Friend'
					onKeyDown={func}
				/>
			</div>
		)
	}

	const styleButton: React.CSSProperties = {
		margin: '5px',
		cursor: 'pointer',
	}
	return (
		<div className='p-2'>
			<div className='d-flex align-items-center text-white'>
				<p className='fw-bold'>Social</p>
				<div className='d-flex justify-content-end w-100 options'>
					{/* TODO: ADDED Function to delete friend */}
					<MdPersonRemoveAlt1
						style={styleButton}
						size={30}
						onClick={() => {
							setShowDLTFriend(!showDLTFriend)
							setShowAddFriend(false)
						}}
					/>
					<MdPersonAddAlt1
						style={styleButton}
						size={30}
						onClick={
							() => {
								setShowAddFriend(!showADDFriend)
								setShowDLTFriend(false)
							}
						}
					/>
					<FaUserFriends
						style={styleButton}
						size={30} onClick={() => { getPlayers(URLS_MiniPerfilPlayers.personal) }}
					/>
					<FaPeopleGroup
						style={styleButton}
						size={30} onClick={() => getPlayers(URLS_MiniPerfilPlayers.Global)}
					/>
				</div>
			</div>
			{showADDFriend ? returnInput(addNewFriend) : null}
			{showDLTFriend ? returnInput(DeleteFriend) : null}
		</div>
	)
}

export default Options
