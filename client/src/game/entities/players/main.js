import * as dom from 'Util/dom';
import * as Dispatcher from 'Util/dispatcher';
import events from 'Events/';

import AbstractPlayer from './abstractPlayer';
import Collisions from 'Game/entities/collision';
import anchorPoint from 'Game/entities/util/anchorPoint';

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

    anchorPoint(this);

    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4,0.4);
    this.alwaysUpdate = true;

    this.body.setCollisionMask(
        me.collision.types.WORLD_SHAPE |
        Collisions.NPC
    );

    this.me.game.viewport.follow(this, this.me.game.viewport.AXIS.BOTH);

    super.addAnimations();

    this.setDirectionChangeNotifier(this.notifyVelocityChange.bind(this));
  }

  notifyVelocityChange(direction, pointPos = {}) {

    const x = pointPos.x || this.pos.x;
    const y = pointPos.y || this.pos.y;

    //
    // only send notifications to others
    // on velocity change, not position
    //
    Dispatcher.dispatchAction({
      type: events.CLIENT.PLAYER.UPDATE_POSITION,
      payload: {
        direction: this.currentDirection,
        velocity: this.body.vel,
        position: {x, y}
      }
    });

  }

  handleMovement() {
    if (this.me.input.isKeyPressed('left')) {
      this.moveLeft();
    }
    else if (this.me.input.isKeyPressed('right')) {
      this.moveRight();
    }
    else if (this.me.input.isKeyPressed('up')) {
      this.moveUp();
    }
    else if (this.me.input.isKeyPressed('down')) {
      this.moveDown();
    } else {
      this.idle();
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
    if( response.b.body.collisionType == Collisions.NPC ) {
      other.togglePlayerText('hello world!');
    }

    return true;
  }
}