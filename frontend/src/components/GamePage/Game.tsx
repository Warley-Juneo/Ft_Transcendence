import { useEffect, useState } from "react";

type informationGame = {
	position: [number, number],
	direction: [number, number],
	positionBar: number,
	collisions: number,
	speed: number
}

export default function Game() {
	const [infosGame, setInfosGame] = useState<informationGame>({
		position: [20, 20], direction: [-2, 2], positionBar: 0,
		collisions: 0, speed: 0
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

				let newY = y + dirY + (dirY < 0 ? -newInfosball.speed : newInfosball.speed);
				let newX = x + dirX + (dirX < 0 ? -newInfosball.speed : newInfosball.speed);


				if (newY < 0 || newY > 98) {
					newInfosball.direction = [-dirY, dirX];
					newY = y + dirY
					newX = x + dirX
				}
				else if (newX > 98) {
					newInfosball.direction = [dirY, -dirX];
					newY = y + dirY
					newX = x + dirX
				}
				else if (newX < 4) {
					newInfosball.collisions++;
					newInfosball.speed = Math.floor(newInfosball.collisions++ / 3);
					if (newY < positionEixoYBar || newY > positionEixoYBar + 26) {
						clearInterval(intervalId);
						alert('Você perdeu!');
					}
					let randon = Math.floor(Math.random() * 3 + 1);
					if (randon === 1)
						newInfosball.direction = [-dirY, -dirX];
					else if (randon === 2)
						newInfosball.direction = [dirY, -dirX];
					else
						newInfosball.direction = [-dirY, dirX];
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
			<div className="d-flex text-white align-items-end justify-content-center w-100">
				<p>collisions {infosGame.collisions}</p>
			</div>
		</div>
	);
}
