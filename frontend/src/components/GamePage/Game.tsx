import { useEffect, useState } from "react";

export default function Game() {
	const [positionEixoYBar, setPositionEixoYBar] = useState(0);
	const [positionBall, setPositionBall] = useState([0, 0]);

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			setPositionEixoYBar((prevPosition) =>
				prevPosition > 0 ? prevPosition - 2 : prevPosition = 0
			);
		} else if (e.key === 'ArrowDown') {
			setPositionEixoYBar((prevPosition) => prevPosition < 74 ? prevPosition + 2 : prevPosition = 74);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setPositionBall((prevPosition) => {
				const newPosition = [...prevPosition]; // Crie uma cópia do array
				if (positionBall[0] + 3 < 100 || positionBall[1] + 3 < 100) {
					newPosition[0] += 3;
					newPosition[1] += 3;
				}
				return newPosition; // Retorne o novo array
			});
		}, 50);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="bg-custon-roxo h-100 rounded position-relative d-flex">
			<div className="bg-light position-relative" style={{ top: `${positionEixoYBar}%`, height: '26%', width: '3%' }}></div>
			<div className="position-relative bg-light rounded-circle" style={{ height: '30px', width: '30px', top: `${positionBall[0]}%`, left: `${positionBall[1]}%` }}></div>
		</div>
	);
}
