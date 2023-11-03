import { useEffect, useState } from "react";

export default function Game() {
	const [positionEixoYBar, setPositionEixoYBar] = useState(0);
	const [positionBall, setPositionBall] = useState([0, 1]);
	const [ballDirection, setBallDirection] = useState([1, 1]);

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			setPositionEixoYBar((prevPosition) => (prevPosition > 0 ? prevPosition - 2 : prevPosition));
		} else if (e.key === 'ArrowDown') {
			setPositionEixoYBar((prevPosition) => (prevPosition < 74 ? prevPosition + 2 : prevPosition));
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
				const [y, x] = prevPosition;
				const [dirY, dirX] = ballDirection;
				const newY = y + dirY * 2;
				const newX = x + dirX * 2;
				if (newY < 0 || newY > 74)
					setBallDirection([-dirY, dirX]);
				if (newX > 74)
					setBallDirection([dirY, -dirX]);
				if (newX < 3) {
					if (newY >= positionEixoYBar && newY <= positionEixoYBar + 26)
						setBallDirection([dirY, -dirX]);
					else
						setBallDirection([-dirY, dirX]);
				}
				return [newY, newX];
			});
		}, 75);

		return () => {
			clearInterval(intervalId);
		};
	}, [ballDirection, positionEixoYBar]);

	return (
		<div className="bg-custon-roxo h-100 rounded position-relative d-flex">
			<div className="bg-light position-relative" style={{ top: `${positionEixoYBar}%`, height: '26%', width: '3%' }}></div>
			<div className="bg-light position-absolute rounded-circle" style={{ height: '30px', width: '30px', top: `${positionBall[0]}%`, left: `${positionBall[1]}%` }}></div>
		</div>
	);
}
