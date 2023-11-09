import { useEffect, useState } from "react";

type informationGame = {
	position: [number, number],
	direction: [number, number],
	positionBar: number,
}

export default function Game() {
	const [infosGame, setInfosGame] = useState<informationGame>({
		position: [50, 50], direction: [-1, 1], positionBar: 0
	} as informationGame
	);

	const handleKeyPress = (e: KeyboardEvent) => {
		setInfosGame((prevPosition: informationGame) => {
			if (e.key === 'ArrowUp') {
				return { ...prevPosition, positionBar: (prevPosition.positionBar > 0 ? prevPosition.positionBar - 2 : prevPosition.positionBar) };
			}
			else if (e.key === 'ArrowDown') {
				return { ...prevPosition, positionBar: (prevPosition.positionBar < 74 ? prevPosition.positionBar + 2 : prevPosition.positionBar) };
			}
			return prevPosition;
		});
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setInfosGame((prevPosition: informationGame) => {
				const newInfosball: informationGame = { ...prevPosition };
				const [y, x] = newInfosball.position;
				const [dirY, dirX] = newInfosball.direction;
				const positionEixoYBar = newInfosball.positionBar;

				const newY = y + dirY * 2;
				const newX = x + dirX * 2;

				if (newY < 0 || newY > 98)
					newInfosball.direction = [-dirY, dirX];
				else if (newX > 98)
					newInfosball.direction = [dirY, -dirX];
				else if (newX < 4) {
					if (newY < positionEixoYBar || newY > positionEixoYBar + 26) {
						clearInterval(intervalId);
						alert('Você perdeu!');
					}
					else
						newInfosball.direction = [-dirY, -dirX];
				}
				else {
					newInfosball.position = [newY, newX];
				}
				return newInfosball;
			});
		}, 75);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="bg-custon-roxo h-100 rounded position-relative d-flex">
			<div
				className="bg-light position-relative"
				style={{ top: `${infosGame.positionBar}%`, height: '26%', width: '4%' }}>
			</div>
			<div
				className="bg-light position-absolute rounded-circle"
				style={{ height: '30px', width: '30px', top: `${infosGame.position[0]}%`, left: `${infosGame.position[1]}%` }}>
			</div>
		</div>
	);
}
