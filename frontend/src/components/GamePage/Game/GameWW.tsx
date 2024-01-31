import { useEffect, useState } from "react"
import BarDataUsers from "./BarDataUsers/BarDataUsers"
import { socket } from "../../InitialPage/Contexts/Contexts"
import { useLocation, useParams } from "react-router-dom"

type GamePongProps = {
	ball: { positionX: number, positionY: number, size: number },
	paddleLeft: { positionX: number, positionY: number, height: number, width: number, velocity: number}
	paddleRight: { positionX: number, positionY: number, height: number, width: number, velocity: number }
	placarLeft: number,
	placarRight: number,
	winner: string,
	window: { height: number, width: number }
	player_left: { id: string, status: boolean, nickname: string },
	player_right: { id: string, status: boolean, nickname: string },
}

const cssPage: React.CSSProperties = {
	height: '100vh',
	width: '100vw',
	overflow: 'hidden',
	backgroundImage: `url(https://wallpaperaccess.com/full/2513478.jpg)`,
	backgroundSize: 'cover',


}

export default function GameWW(): JSX.Element {
	const [fakeGame, setFakeGame] = useState<GamePongProps>({
		ball: { positionX: 400, positionY: 300, size: 24 },
		paddleLeft: { positionX: 20, positionY: 300, height: 120, width: 40, velocity: 5 },
		paddleRight: { positionX: 780, positionY: 300, height: 120, width: 40, velocity: 5 },
		placarLeft: 0,
		placarRight: 0,
		winner: '',
		window: { height: 600, width: 800 },
		player_left: { id: '123', status: true, nickname: "Luffytaro" },
		player_right: { id: '1234', status: true, nickname: "Zorotaro" },
	})

	const room = useParams().room
	const cssDivGame: React.CSSProperties = {
		height: fakeGame.window.height,
		width: fakeGame.window.width,
		boxShadow: '0px 0px 15px 5px white',
		position: 'relative',

	}

	const divFilds: React.CSSProperties = {
		height: fakeGame.window.height,
		width: '5px',
		backgroundColor: 'white',
		position: 'absolute',
		top: 0,
		left: '50%',
	}

	useEffect(() => {
		socket.on('updateGame', (data: GamePongProps) => {
			console.log("RECEBENDO: ", data);
			setFakeGame(data)
		})
	}, [])


	useEffect(() => {
		const intervalId = setInterval(() => {
			socket.emit('updateGame', '123')
		}, 1000);
	}, [])

	const paddleLeft: React.CSSProperties = {
		height: fakeGame.paddleLeft.height,
		width: fakeGame.paddleLeft.width,
		backgroundColor: 'white',
		position: 'absolute',
		top: fakeGame.paddleLeft.positionY,
		left: fakeGame.paddleLeft.positionX,
	}

	const paddleRight: React.CSSProperties = {
		height: fakeGame.paddleRight.height,
		width: fakeGame.paddleRight.width,
		backgroundColor: 'white',
		position: 'absolute',
		top: fakeGame.paddleRight.positionY,
		left: fakeGame.paddleRight.positionX,
	}

	const ball: React.CSSProperties = {
		height: fakeGame.ball.size,
		width: fakeGame.ball.size,
		backgroundColor: 'white',
		position: 'absolute',
		top: fakeGame.ball.positionY,
		left: fakeGame.ball.positionX,
		borderRadius: '50%',
	}

	return (
		<div style={cssPage}>

			<div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
				<BarDataUsers
					nicknameLeft={fakeGame.player_left.nickname}
					nicknameRight={fakeGame.player_right.nickname}
					gameWight={fakeGame.window.width}
				/>

				{/* Componente */}
				<div style={cssDivGame} >
					<div style={divFilds}></div>
					<div style={paddleLeft}></div>
					<div style={paddleRight}></div>
					<div style={ball}></div>

					<div className="d-flex">
						<div className="w-50 text-white text-center">
							<p className="fs-1">{fakeGame.placarLeft}</p>
						</div>

						<div className="w-50 text-white text-center">
							<p className="fs-1">{fakeGame.placarRight}</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}
