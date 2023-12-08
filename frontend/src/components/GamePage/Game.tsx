import { useEffect, useRef } from "react";
import Phaser from "phaser";
import backgroundSpace from "../../assets/game/backgroundSpace.png";
import rocket from '../../assets/store/skins/AceIcon.svg';
import planetaAnel from '../../assets/game/planetaJupter.png';
import planetaFire from '../../assets/game/planetaFire.png';
import planetaLua from '../../assets/game/PlanetaLua.png';

export default function Game(): JSX.Element {
	const gameContainerRef = useRef<HTMLDivElement>(null);
	let rocketSprite: Phaser.Physics.Arcade.Sprite | undefined;
	let pntAnel: Phaser.Physics.Arcade.Sprite | undefined;
	let pntFire: Phaser.Physics.Arcade.Sprite | undefined;
	let pntLua: Phaser.Physics.Arcade.Sprite | undefined;


	useEffect(() => {
		if (!gameContainerRef.current) {
			return;
		}

		const containerHeight = gameContainerRef.current?.clientHeight || window.innerHeight; // Altura do container ou da janela
		const containerWidth = gameContainerRef.current?.clientWidth || window.innerWidth; // Largura do container ou da janela

		// Configurações básicas do jogo Phaser
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO, // WebGL ou Canvas esse e o tipo de renderização
			parent: gameContainerRef.current, // Onde o jogo será renderizado
			scale: { // Configurações de escala do jogo
				mode: Phaser.Scale.ScaleModes.RESIZE, // Modo de escala
				autoCenter: Phaser.Scale.CENTER_BOTH, // Centralizar o jogo
				width: containerWidth, // Largura do jogo
				height: containerHeight, // Altura do jogo
			},
			scene: { // Cenas do jogo
				preload: preload, // Pré-carregamento de recursos
				create: create, // Criação de elementos
				update: update, // Lógica de atualização
			},
			physics: { // Configurações de física
				default: 'arcade', // Motor de física padrão
				arcade: { // Configurações do motor de física arcade
					gravity: { y: 0 }, // Gravidade do jogo
					debug: true, // Mostrar colisões
				},
			},
		};

		// Inicializa o jogo
		const game = new Phaser.Game(config);

		// Pré-carrega recursos (imagens, áudio, etc.)
		function preload(this: Phaser.Scene) {
			// Carregue suas imagens aqui, se necessário
			this.load.image("background", backgroundSpace);
			this.load.image("rocket", rocket);
			this.load.image("planetaAnel", planetaAnel);
			this.load.image("planetaFire", planetaFire);
			this.load.image("planetaLua", planetaLua);
		}

		// Criação de elementos do jogo
		function create(this: Phaser.Scene) { //Pharser.Scene é o tipo de this que estamos usando
			// Adicione os elementos do seu jogo aqui

			const background = this.add.sprite(containerWidth / 2, containerHeight / 2, "background"); // Adiciona o fundo do jogo no centro da tela
			background.setScale(containerWidth / background.width, containerHeight / background.height); // Redimensiona o fundo para preencher a tela

			// Phaser.Physics.Arcade.Sprite é o tipo de retorno de this.physics.add.sprite
			rocketSprite = this.physics.add.sprite(0, containerHeight, "rocket") as Phaser.Physics.Arcade.Sprite;

			//added planets
			pntAnel = this.physics.add.sprite((containerWidth * 0.9), (containerHeight * 0.8), "planetaAnel").setImmovable() as Phaser.Physics.Arcade.Sprite
			pntFire = this.physics.add.sprite((containerWidth * 0.1), (containerHeight * 0.2), "planetaFire").setImmovable() as Phaser.Physics.Arcade.Sprite
			pntLua = this.physics.add.sprite((containerWidth * 0.7), (containerHeight * 0.2), "planetaLua").setImmovable() as Phaser.Physics.Arcade.Sprite

			pntAnel.setName("Anel");
			pntFire.setName("Fire");
			pntLua.setName("Lua");

			rocketSprite.setVelocityX(0); // Inicializa a velocidade horizontal da nave
			this.physics.world.setBounds(0, 0, containerWidth, containerHeight);
			rocketSprite.setCollideWorldBounds(true);
		}

		// Lógica de atualização do jogo
		function update(this: Phaser.Scene) {
			const curso = this.input.keyboard?.createCursorKeys(); // event listener para as teclas de seta

			if (!curso || !rocketSprite) { // Se não houver teclas de seta ou a nave não existir, retorne
				return;
			}

			if (curso.left.isDown) {
				rocketSprite.setVelocityX(-100);
			} else if (curso.right.isDown) {
				rocketSprite.setVelocityX(100);
			} else {
				rocketSprite.setVelocityX(0); // Stop horizontal movement when no key is pressed
			}

			if (curso.up.isDown) {
				rocketSprite.setVelocityY(-100);
			} else if (curso.down.isDown) {
				rocketSprite.setVelocityY(100);
			} else {
				rocketSprite.setVelocityY(0); // Stop vertical movement when no key is pressed
			}

			if (!pntAnel || !pntFire || !pntLua) return;

			this.physics.world.collide(rocketSprite, [pntAnel, pntFire, pntLua], (rocket, planet) => {
				// Verifica se 'planet' é do tipo Sprite antes de acessar a propriedade 'name'
				if (planet instanceof Phaser.Physics.Arcade.Sprite && planet.name) {
					console.log(`A nave colidiu com o planeta: ${planet.name}`);
				}
			});

		}

		// Limpeza quando o componente for desmontado
		return () => {
			game.destroy(true);
		};
	}, []); // A dependência vazia garante que isso só seja executado uma vez

	return <div ref={gameContainerRef} className="h-100 rounded" />;
}
