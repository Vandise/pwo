import * as dom from 'Util/dom';

const MOVEMENT_VELOCITY = 2.5;
const MOVEMENT_FRAME_SPEED = 150;

export default class MainPlayer extends dom.globals.me.Entity {

  constructor(x, y, settings) {
    settings.width = 48;
    settings.height = 63;
    settings.image = 'Male_MainPlayer_Default';
    settings.framewidth = 48;
    settings.frameheight = 63;
    settings.shapes[0] = new me.Rect(0, 0, 25, 32);

    super(x, y, settings);

    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);
    this.alwaysUpdate = true;

    this.me.game.viewport.follow(this, this.me.game.viewport.AXIS.BOTH);

    this.renderable.addAnimation("stand_left",  [10])
    this.renderable.addAnimation("walk_left",  [9, 10, 11], MOVEMENT_FRAME_SPEED);

    this.renderable.addAnimation("stand_right",  [4]);
    this.renderable.addAnimation("walk_right",  [3, 4, 5], MOVEMENT_FRAME_SPEED);

    this.renderable.addAnimation("stand_up",  [1]);
    this.renderable.addAnimation("walk_up",  [0, 1, 2], MOVEMENT_FRAME_SPEED);

    this.renderable.addAnimation("stand_down",  [7]);
    this.renderable.addAnimation("walk_down",  [6, 7, 8], MOVEMENT_FRAME_SPEED);

    this.renderable.setCurrentAnimation("stand_up");

    this.currentDirection = 'up';

    this.anchorPoint.set(-0.45, -0.6);
  }

  handleMovement() {
    if (this.me.input.isKeyPressed('left')) {
      this.currentDirection = 'left';
      this.body.vel.x = -MOVEMENT_VELOCITY;
      this.body.vel.y = 0;

      if (!this.renderable.isCurrentAnimation('walk_left')) {
        this.renderable.setCurrentAnimation('walk_left');
      }
    }
    else if (this.me.input.isKeyPressed('right')) {
      this.currentDirection = 'right';
      this.body.vel.x = MOVEMENT_VELOCITY;
      this.body.vel.y = 0;

      if (!this.renderable.isCurrentAnimation('walk_right')) {
        this.renderable.setCurrentAnimation('walk_right');
      }
    }
    else if (this.me.input.isKeyPressed('up')) {
      this.currentDirection = 'up';
      this.body.vel.y = -MOVEMENT_VELOCITY;
      this.body.vel.x = 0;

      if (!this.renderable.isCurrentAnimation('walk_up')) {
        this.renderable.setCurrentAnimation('walk_up');
      }
    }
    else if (this.me.input.isKeyPressed('down')) {
      this.currentDirection = 'down';
      this.body.vel.y = MOVEMENT_VELOCITY;
      this.body.vel.x = 0;

      if (!this.renderable.isCurrentAnimation('walk_down')) {
        this.renderable.setCurrentAnimation('walk_down');
      }
    } else {
      this.body.vel.x = 0;
      this.body.vel.y = 0;

      const animation = `stand_${this.currentDirection}`;
      if (!this.renderable.isCurrentAnimation(animation)) {
        this.renderable.setCurrentAnimation(animation);
      }
    }
  }

  update(dt) {
    this.handleMovement();

    this.body.update(dt);
    this.me.collision.check(this);

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
      return super.update(dt);
    }
    return true;
  }

  onCollision(response, other) {
    return true;
  }
}