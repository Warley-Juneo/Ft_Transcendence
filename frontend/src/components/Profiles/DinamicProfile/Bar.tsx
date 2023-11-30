import { AiOutlineClose } from 'react-icons/ai';

export default function BarDinamicChat({ dinamicProfile }: {
	dinamicProfile: React.Dispatch<React.SetStateAction<{
		show: boolean,
		nickName: string
	}>>
}): JSX.Element {

	return (
		<div className='d-flex justify-content-end mb-2'>
			<AiOutlineClose	className="ms-5"
							role="button"
							size={30}
							onClick={() => {dinamicProfile({ show: false, nickName: '' })}}/>
		</div>
	);
}
