type propsButtonBuy = {
	photo: string,
	price: number,
}
export default function ButtonBuy(props: propsButtonBuy): JSX.Element {
	return (
		<div style={{ height: '4rem', width: '6rem', margin: '1rem' }}>
			<div className='h-100'>
				<img className='h-100 w-100' src={props.photo} alt="playPong" />
			</div>
			<button type="button" className="w-100">
				{props.price}
			</button>
		</div>
	)
}
