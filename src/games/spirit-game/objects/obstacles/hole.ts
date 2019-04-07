
export class Hole extends Phaser.GameObjects.Zone {
    constructor(params) {
      super(params.scene, params.x, params.y, params.width, params.height);
  
      this.initImage();

      this.scene.add.existing(this);
    }
  
    private initImage(): void {
      // image
      this.setOrigin(0, 0);
  
      // physics
      this.scene.physics.world.enable(this);
      this.body.setImmovable(true);
    }
  
    update(): void {}
  }
  