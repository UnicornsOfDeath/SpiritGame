export class Ghost extends Phaser.GameObjects.Sprite {
  // variables
  private speed: number;
  private accel: number;
  private maxSpeed: number;

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
    this.accel = 30;
    this.maxSpeed = 400;

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);
    this.setScale(4);
    this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

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
      this.body.setVelocityY(Math.max(this.body.velocity.y - this.accel, -this.maxSpeed));
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(Math.min(this.body.velocity.y + this.accel, this.maxSpeed));
    } else if (this.cursors.left.isDown) {
      this.body.setVelocityX(Math.max(this.body.velocity.x - this.accel, -this.maxSpeed));
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(Math.min(this.body.velocity.x + this.accel, this.maxSpeed));
    } else {
      //this.body.setVelocity(0, 0);
    }
  }
}
