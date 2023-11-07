import StatusOnline from './StatusOnline';
import {useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import ChatPrivate from '../../ChatsGame/ChatPrivate/ChatPrivate';

export default function ListFriends() {
	const	[info, setInfo] = useState([{avatar: "", nickname: "", id: ""}]);
	const	[chatPrivate, setChatPrivate] = useState(false);

	const showChatPrivate = () => {
		setChatPrivate(!chatPrivate);
	}

	const axios_connect = () => {
		axios.get('http://localhost:3000/users/friends', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		})
		.then((res) => {
			setInfo(res.data);
			console.log("res.data: ", res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	useEffect(() => {
	  axios_connect();
	}, []);

	return (
		<div className='p-2 text-white overflow-auto'>
			{chatPrivate && <ChatPrivate />}
			{info && info.map(friend => {
				return (
					<div className='d-flex hover' onClick={showChatPrivate} key={friend.id}>
					<img className="foto-list-friends" src={friend.avatar} alt='foto' />
					{StatusOnline(friend.nickname)}
				</div>
				)
			})}

		</div>
	);
}
