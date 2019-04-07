export class Ghost extends Phaser.GameObjects.Sprite {
  // variables
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
    this.accel = 30;
    this.maxSpeed = 400;
  
    // physics
    this.scene.physics.world.enable(this);

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);
    this.setScale(4);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // animation
    this.anims.load('ghost1');
    this.anims.play('ghost1');
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
    let v = new Phaser.Math.Vector2(0, 0);
    if (this.cursors.up.isDown) {
      v.y = -1;
    } else if (this.cursors.down.isDown) {
      v.y = 1;
    }
    if (this.cursors.left.isDown) {
      v.x = -1;
    } else if (this.cursors.right.isDown) {
      v.x = 1;
    } else {
      //this.body.setVelocity(0, 0);
    }
    v = v.normalize();
    v = v.scale(this.accel);
    this.body.velocity = this.body.velocity.add(v);
    if (this.body.velocity.length() > this.maxSpeed) {
      v = this.body.velocity;
      v.normalize();
      this.body.velocity = v.scale(this.maxSpeed);
    }

    // Face left/right based on velocity
    this.flipX = this.body.velocity.x > 0;
  }
}
