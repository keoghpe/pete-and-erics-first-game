import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, 'mushroom')
    game.physics.arcade.enable(this)
    this.body.gravity.y = 1000
  }

  jump() {
    this.body.velocity.y = -350;
  }
}
