export default function Rank({rank}: {rank: string}): JSX.Element {
	return (
		<div className='p-2'>
			<img className='img-fluid' src={rank} alt={`Foto do rank da pessoa`} />
		</div>
	)
}
