import { propsImageProfile } from "../../typesProfile";

export default function ProfilePhoto(props: propsImageProfile): JSX.Element {
	return (
		<div>
			<div className={props.borderImg}>
				<img className='img-fluid rounded-circle m-auto' src={props.avatar} alt='foto' />
			</div>
			<h2 className='mt-2 letter-pixel'>{props.nickname}</h2>
		</div>

	);
}
