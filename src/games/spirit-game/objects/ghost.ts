export class Ghost extends Phaser.GameObjects.Sprite {
  // variables
  private accel: number;
  private maxSpeed: number;
  private key: string;

  // input
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyI: Phaser.Input.Keyboard.Key;
  private keyJ: Phaser.Input.Keyboard.Key;
  private keyK: Phaser.Input.Keyboard.Key;
  private keyL: Phaser.Input.Keyboard.Key;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.key = params.key;

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage() {
    // variables
    this.accel = 7;
    this.maxSpeed = 100;
  
    // physics
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);

    // input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyI = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    this.keyJ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.keyL = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    // animation
    this.anims.load(this.key);
    this.anims.play(this.key);
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
    switch (this.key) {
      case 'ghost1':
        // cursor keys 
        if (this.cursors.up.isDown) {
          v.y = -1;
        } else if (this.cursors.down.isDown) {
          v.y = 1;
        }
        if (this.cursors.left.isDown) {
          v.x = -1;
        } else if (this.cursors.right.isDown) {
          v.x = 1;
        }
        break;
      case 'ghost2':
        // wasd 
        if (this.keyW.isDown) {
          v.y = -1;
        } else if (this.keyS.isDown) {
          v.y = 1;
        }
        if (this.keyA.isDown) {
          v.x = -1;
        } else if (this.keyD.isDown) {
          v.x = 1;
        }
        break;
      case 'ghost3':
        // ijkl
        if (this.keyI.isDown) {
          v.y = -1;
        } else if (this.keyK.isDown) {
          v.y = 1;
        }
        if (this.keyJ.isDown) {
          v.x = -1;
        } else if (this.keyL.isDown) {
          v.x = 1;
        }
        break;
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
