import { propsImageProfile } from "../../typesProfile";

export default function ProfilePhoto(props: propsImageProfile): JSX.Element {
	return (
		<div className="h-100 d-flex flex-column">
			<div className={props.borderImg} style={{height: '95%'}} >
				<img className='img-fluid rounded-circle m-auto h-100' src={props.avatar} alt='foto' />
			</div>
			<p className='letter-pixel'>{props.nickname}</p>
		</div>

	);
}
