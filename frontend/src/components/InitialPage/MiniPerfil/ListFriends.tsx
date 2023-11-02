import StatusOnline from './StatusOnline';
import {useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function ListFriends({chat}: any) {

	const [info, setInfo] = useState([{avatar: "", nickname: ""}]);
	const jwtToken = Cookies.get('jwtToken')

	const axios_connect = () => {
		axios.get('http://localhost:3000/users/friends', {
			headers: {
				Authorization: jwtToken,
			}
		})
		.then((res) => {
			setInfo(res.data);
		})
	}

	console.log("Friends: ", info);
	useEffect(() => {
	  axios_connect();
	}, []);


	return (

		<div className='p-2 text-white overflow-auto'>
			{info && info.map(friend => {
				return (
					<div className='d-flex hover' onClick={chat}>
					<img className="rounded-circle h-100 w-100 me-3" src={friend.avatar} alt='foto' />
					{StatusOnline(friend.nickname)}
				</div>

				)

			})}

			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/ab/86/b1/ab86b13309ad04f8b500b8f5f8330c06.jpg' alt='foto' />
				{StatusOnline('Sanji')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>


			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
			<div className='d-flex hover' onClick={chat}>
				<img className='foto-list-friends' src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				{StatusOnline('Nami')}
			</div>
		</div>
	);
}

export default ListFriends;
