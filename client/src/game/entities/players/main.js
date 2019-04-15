import * as dom from 'Util/dom';
import * as Dispatcher from 'Util/dispatcher';
import events from 'Events/';

import AbstractPlayer from './abstractPlayer';

const MOVEMENT_VELOCITY = 2.5;
const MOVEMENT_FRAME_SPEED = 150;

export default class MainPlayer extends AbstractPlayer {

  constructor(x, y, settings) {

    settings.width = 48;
    settings.height = 63;
    settings.framewidth = 48;
    settings.frameheight = 63;
    settings.shapes[0] = new me.Rect(0, 0, 25, 32);

    super(x, y, settings);

    window.player = this;

    this.me = dom.globals.me;

    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);
    this.alwaysUpdate = true;
    this.anchorPoint.set(-0.45, -0.6);

    this.me.game.viewport.follow(this, this.me.game.viewport.AXIS.BOTH);

    super.addAnimations();

    this.setDirectionChangeNotifier(this.notifyVelocityChange.bind(this));
  }

  notifyVelocityChange(direction) {
    //
    // only send notifications to others
    // on velocity change, not position
    //
    Dispatcher.dispatchAction({
      type: events.CLIENT.PLAYER.UPDATE_POSITION,
      payload: {
        direction: this.currentDirection,
        velocity: this.body.vel,
        time: Date.now(),
        position: {
          x: this.pos.x,
          y: this.pos.y
        }
      }
    });

  }

  handleMovement() {
    if (this.me.input.isKeyPressed('left')) {
      super.moveLeft();
    }
    else if (this.me.input.isKeyPressed('right')) {
      super.moveRight();
    }
    else if (this.me.input.isKeyPressed('up')) {
      super.moveUp();
    }
    else if (this.me.input.isKeyPressed('down')) {
      super.moveDown();
    } else {
      super.idle();
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
    return false;
  }
}