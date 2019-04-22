import * as dom from 'Util/dom';
import * as Dispatcher from 'Util/dispatcher';
import events from 'Events/';

import AbstractPlayer from './abstractPlayer';
import Collisions from 'Game/entities/collision';
import anchorPoint from 'Game/entities/util/anchorPoint';

const MOVEMENT_VELOCITY = 2.5;
const MOVEMENT_FRAME_SPEED = 150;

export default class OtherPlayer extends AbstractPlayer {

  constructor(x, y, settings) {
    settings.width = 48;
    settings.height = 63;
    settings.framewidth = 48;
    settings.frameheight = 63;
    settings.shapes[0] = new me.Rect(0, 0, 25, 32);

    super(x, y, settings);

    this.me = dom.globals.me;

    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);
    this.alwaysUpdate = true;
    this.body.collisionType = Collisions.OTHER_PLAYER;

    this.heading = { x: 0, y: 0 };

    super.addAnimations();

    anchorPoint(this);
  }

  move(data) {
    this.heading = {
      y: data.velocity.y,
      x: data.velocity.x
    }

    const {x, y} = this.heading;

    if (x < 0 && y == 0) { return this.moveLeft(); }
    if (x > 0 && y == 0) { return this.moveRight(); }
    if (x == 0 && y < 0) { return this.moveUp(); }
    if (x == 0 && y > 0) { return this.moveDown(); }
    if (x == 0 && y == 0) { return this.idle(); }
  }

  update(dt) {

    this.body.vel.x = this.heading.x;
    this.body.vel.y = this.heading.y;

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