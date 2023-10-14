import './styles/listFriends.css';

function ListFriends({chat}: any) {
	console.log("ListFriends ", chat);
	return (
		<div className='p-2'>
			<div className='d-flex friend' onClick={chat}>
				<div className='div-foto-friend'>
					<img src='https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg' alt='foto' />
				</div>
				<div className='d-flex flex-column'>
					<p>Zoro</p>
					<div className='d-flex align-items-center'>
						<div className='online-border d-flex justify-content-center align-items-center'>
							<div className='online'></div>
						</div>
						online
					</div>
				</div>
			</div>

			<div className='d-flex friend' onClick={chat}>
				<div className='div-foto-friend'>
					<img src='https://i.pinimg.com/originals/ab/86/b1/ab86b13309ad04f8b500b8f5f8330c06.jpg' alt='foto' />
				</div>
				<div className='d-flex flex-column'>
					<p>Sanji</p>
					<div className='d-flex align-items-center'>
						<div className='online-border d-flex justify-content-center align-items-center'>
							<div className='online'></div>
						</div>
						online
					</div>
				</div>
			</div>
			<div className='d-flex friend' onClick={chat}>
				<div className='div-foto-friend'>
					<img src='https://i.pinimg.com/originals/a3/b7/54/a3b7549fd1c7b84ee7bd70330163752f.jpg' alt='foto' />
				</div>
				<div className='d-flex flex-column'>
					<p>Nami</p>
					<div className='d-flex align-items-center'>
						<div className='online-border d-flex justify-content-center align-items-center'>
							<div className='online'></div>
						</div>
						online
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListFriends;
