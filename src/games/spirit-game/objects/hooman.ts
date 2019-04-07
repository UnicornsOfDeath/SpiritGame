export class Hooman extends Phaser.GameObjects.Sprite {
    // variables
    private speed: number;
    private moveVel: Phaser.Math.Vector2;
  
    constructor(params) {
      // Select random key
      const key = `adventurer_${['m', 'f'][Phaser.Math.Between(0, 1)]}${Phaser.Math.Between(1, 4)}`
      super(params.scene, params.x, params.y, key, params.frame);
  
      this.initImage();
      this.scene.add.existing(this);
    }
  
    private initImage() {
      // variables
      this.speed = 100;
      this.moveVel = new Phaser.Math.Vector2(1, 0);
  
      // image
      this.setOrigin(0.5, 0.5);
      this.setDepth(0);
      this.setScale(4);
      this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    
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
      // move
      let v = this.moveVel.clone();
      v = v.scale(this.speed);
      this.body.velocity = v;
    }
  }
  