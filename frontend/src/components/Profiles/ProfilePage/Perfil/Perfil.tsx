import axios from 'axios';
import Cookies from 'js-cookie';
import ProfilePhoto from './Image';
import { useContext, useEffect, useState } from 'react';
import Rank from './rank';
import Pointer from './pontos';
import { DataUser } from '../../../InitialPage/InitialPage';
import { InfosUserPerfil, RankFormating } from '../../typesProfile';
import { RankMappings } from '../../RankMapings'
import HandleRank from '../../RankMapings';


export default function InformationsUser() {
	const [user, setInfosUser] = useState<InfosUserPerfil>({} as InfosUserPerfil);
	const dataUser = useContext(DataUser);

	const getProfile = (): void => {
		axios.get(`http://localhost:3000/users/profile/?nick_name=${dataUser.user.nickname}`, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		})
			.then((response) => {
				setInfosUser(response.data);
			}
			).catch((error) => {
			})
	}

	useEffect(() => {
		getProfile();
	}, []);

	let pointers: number = user.wins - user.loses;
	const { rank, borderImg, borderWrite } = HandleRank(pointers);
	let aux = user.wins + user.draws;
	let kda: number = aux === 0 ? user.loses : aux / user.loses;
	return (
		<div className='text-center text-white'>
			<ProfilePhoto
				borderImg={borderImg}
				avatar={dataUser.user.avatar}
				nickname={dataUser.user.nickname}
			/>
			<div className='d-flex flex-column align-items-center'>
				<Rank rank={rank} />
				<Pointer
					wins={user.wins}
					loses={user.loses}
					draws={user.draws}
					kda={kda}
					borderWrite={borderWrite}
					pointers={pointers}
				/>
			</div>
		</div>
	);
}
