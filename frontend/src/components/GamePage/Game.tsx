import { useEffect, useState } from "react";

export default function Game() {
	const [positionEixoY, setPositionEixoY] = useState(0);
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			setPositionEixoY((prevPosition) => prevPosition > 0 ? prevPosition - 2 : prevPosition = 0);
		} else if (e.key === 'ArrowDown') {
			setPositionEixoY((prevPosition) => prevPosition < 75 ? prevPosition + 2 : prevPosition = 75);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		const newPosition = Math.random() * 75;
	// 		setPositionEixoY(newPosition);
	// 	}, 500);

	// 	return () => {
	// 		clearInterval(intervalId);
	// 	};
	// }, []);

	return (
		<div className="bg-custon-roxo h-100 rounded position-relative">
			<p>teste {positionEixoY}</p>
			<div className="h-25 bg-light position-absolute" style={{ top: `${positionEixoY}%`, width: '3%' }}></div>
			<div className="position-absolute bg-light rounded-circle" style={{ height: '30px', width: '30px', top: '54%', left: '54%' }}></div>
		</div>
	);
}
