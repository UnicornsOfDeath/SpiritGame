export class Ghost extends Phaser.GameObjects.Sprite {
  // variables
  private speed: number;

  // input
  private cursors: Phaser.Input.Keyboard.CursorKeys;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage() {
    // variables
    this.speed = 100;

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);
    this.angle = 180;

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  
    // physics
    this.scene.physics.world.enable(this);
  }

  update(): void {
    if (this.active) {
      this.handleInput();
    } else {
      this.destroy();
    }
  }

  private handleInput() {
    // move ghost
    if (this.cursors.up.isDown) {
      this.scene.physics.velocityFromRotation(
        -Math.PI / 2,
        this.speed,
        this.body.velocity
      );
    } else if (this.cursors.down.isDown) {
      this.scene.physics.velocityFromRotation(
        Math.PI / 2,
        this.speed,
        this.body.velocity
      );
    } else if (this.cursors.left.isDown) {
      this.scene.physics.velocityFromRotation(
        Math.PI,
        this.speed,
        this.body.velocity
      );
    } else if (this.cursors.right.isDown) {
      this.scene.physics.velocityFromRotation(
        -Math.PI,
        -this.speed,
        this.body.velocity
      );
    } else {
      this.body.setVelocity(0, 0);
    }
  }
}
