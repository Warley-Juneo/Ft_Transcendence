import StatusOnline from "./StatusOnline";

function MiniPerfilUser(data: any) {
	console.log("AAAAAAAAAAAAAHHHHHHHHHHHHH", data);
	return (
		<div className='p-2 d-flex align-items-center text-white' style={{height: '15vh'}}>
			<img className="rounded-circle h-75" src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
			{StatusOnline(data.userdata._first_name)}
		</div>
	);
}

export default MiniPerfilUser;
