import { AiOutlineClose } from 'react-icons/ai';

type propsDinamicProfile = {
	openDinamicPerfil: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BarDinamicChat(props: propsDinamicProfile): JSX.Element {

	return (
		<div className='d-flex justify-content-end mb-2'>
			<AiOutlineClose className="ms-5"
				role="button"
				size={30}
				onClick={() => { props.openDinamicPerfil(false) }}
			/>
		</div>
	);
}
