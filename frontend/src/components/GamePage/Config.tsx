import Phaser from 'phaser';
import test from '../../assets/game/barrafuncional.png';

export class CustomScene extends Phaser.Scene {
	paddle1: Phaser.Physics.Arcade.Sprite;
	paddle2: Phaser.Physics.Arcade.Sprite;
	paddle1UpKey: Phaser.Input.Keyboard.Key;
	paddle1DownKey: Phaser.Input.Keyboard.Key;;
	paddle2UpKey: Phaser.Input.Keyboard.Key;;
	paddle2DownKey: Phaser.Input.Keyboard.Key;;
	ball: Phaser.Physics.Arcade.Sprite;

	constructor() {
		super('CustomScene');
		this.paddle1 = {} as Phaser.Physics.Arcade.Sprite;
		this.paddle2 = {} as Phaser.Physics.Arcade.Sprite;
		this.paddle1UpKey = {} as Phaser.Input.Keyboard.Key;
		this.paddle1DownKey = {} as Phaser.Input.Keyboard.Key;
		this.paddle2UpKey = {} as Phaser.Input.Keyboard.Key;
		this.paddle2DownKey = {} as Phaser.Input.Keyboard.Key;
		this.ball = {} as Phaser.Physics.Arcade.Sprite;
	}

	preload() {
		this.load.image('paddle', test);
		this.load.image('ball', 'caminho/para/imagem/da/bola.png');
	}

	create() {
		this.add.text(this.scale.width / 2, 10, 'Space Pong', { font: '16px Courier', color: '#00ff00' });

		this.paddle1 = this.physics.add.sprite(50, this.scale.height / 2, 'paddle')
			.setImmovable(true)
			.setScale(0.1);
		this.paddle2 = this.physics.add.sprite(this.scale.width - 50, this.scale.height / 2, 'paddle')
			.setImmovable(true)
			.setScale(0.1);

		if (this.input && this.input.keyboard) {
			this.paddle1UpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
			this.paddle1DownKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			this.paddle2UpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
			this.paddle2DownKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		}

		this.ball = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, 'ball');

		this.ball.setVelocity(300, 0);
		this.ball.setCollideWorldBounds(true);
		this.physics.world.setBoundsCollision(false, false, true, true);

		this.paddle1.setCollideWorldBounds(true);
		this.paddle2.setCollideWorldBounds(true);

		this.physics.add.collider(this.ball, this.paddle1, this.ballHitPaddle, undefined, this);
		this.physics.add.collider(this.ball, this.paddle2, this.ballHitPaddle, undefined, this);
	}

	ballHitPaddle(ball: any, paddle: any) {

	}

	update(this: CustomScene) {
		if (!this.ball) return;

		if (!this.paddle1 || !this.paddle2) return;

		if (this.ball.x < 0 || this.ball.x > this.scale.width) this.scene.restart();
		if (this.paddle1UpKey.isDown) this.paddle1.setVelocityY(-150);
		else if (this.paddle1DownKey.isDown) this.paddle1.setVelocityY(150);
		else this.paddle1.setVelocityY(0)

		if (this.paddle2UpKey.isDown) this.paddle2.setVelocityY(-150);
		else if (this.paddle2DownKey.isDown) this.paddle2.setVelocityY(150);
		else this.paddle2.setVelocityY(0)
	}
}

