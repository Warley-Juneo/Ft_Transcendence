import Status from './PlayersStatus';
import { useState } from 'react';
import ChatPrivate from '../../ChatsGame/ChatPrivate/ChatPrivate';
import DinamicProfile from '../DinamicProfile/DinamicProfile';

export type Players = {
	avatar: string,
	id: string,
	nickname: string,
	is_active: boolean,
	match_status: string
}

type PropsListFriends = {
	players: Players[],
	getPlayers: (route: string) => void,
	admin?: Players[]
	mute?: { id: string }[]
}

export default function ListFriends(props: PropsListFriends) {
	const [chatPrivate, setChatPrivate] = useState(false);
	const [dataOpenDirect, setDataOpenDirect] = useState({ nickname: '', avatart: '' });
	const [dinamicProfile, setDinamicProfile] = useState<string>("");
	const [profileData, setProfileData] = useState<{ id: string, nickname: string }>(
		{ id: '', nickname: '' }
	);

	function handleOpenChatPrivate(nickname: string, avatar: string) {
		setChatPrivate(!chatPrivate)
		setDataOpenDirect({ nickname: nickname, avatart: avatar })
	}

	function clickPhoto(id: string, nickName: string) {
		setDinamicProfile("open")
		setProfileData({ id: id, nickname: nickName })
	}

	let type = typeof props.players;
	if (!props.players || type === 'string') {
		return (
			<div>
				<div className='d-flex justify-content-center'>
					<p className='text-white'>Carregando...</p>
				</div>
			</div>
		)
	}
	return (
		<div className='p-2 text-white overflow-auto'>
			{!chatPrivate ? null : <ChatPrivate nick_name={dataOpenDirect.nickname} avatar={dataOpenDirect.avatart} />}
			{!dinamicProfile ? null :
				<DinamicProfile
					openDinamicProfile={setDinamicProfile}
					nickName={profileData.nickname}
					id={profileData.id}
				/>
			}
			{
				props.players.map((play: Players) => {
					return (
						<div className='d-flex hover' key={play.id}>
							<img
								className="foto-list-friends"
								src={play.avatar}
								alt='foto'
								onClick={() => clickPhoto(play.id, play.nickname)}
							/>
							<div className='d-flex w-100' onClick={() => handleOpenChatPrivate(play.nickname, play.avatar)}>
								<Status
									is_active={play.is_active}
									name={play.nickname} play_id={play.id}
									mute={props.mute ? props.mute : []}
									admin={props.admin ? props.admin : []}
									match_status={play.match_status}
								/>
							</div>
						</div>
					)
				})}

		</div>
	);
}
