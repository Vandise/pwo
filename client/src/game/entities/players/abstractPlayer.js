import * as dom from 'Util/dom';
import PlayerNameText from 'Game/components/player/nameText';
import Collision from 'Game/entities/collision';

const MOVEMENT_VELOCITY = 2.5;
const MOVEMENT_FRAME_SPEED = 150;
const DEFAULT_DIRECTION = 'up';
const TEXT_TOGGLE_DURATION = 2000;

export default class AbstractPlayer extends dom.globals.me.Entity {

  constructor(x, y, settings) {
    super(x, y, settings);

    this.settings = settings;
    this.heading = { y: 0, x: 0 };
    this.currentDirection = settings.direction || DEFAULT_DIRECTION;
    this.notifyDirectionChange = () => true;
    this.nameVisible = false;
    this.username = null;
    this.nameText = new PlayerNameText(0, 0, this);

    this.children.forEach((c) => {
      c.anchorPoint.set(0, 0);
    });
  }

  togglePlayerText(text, duration = TEXT_TOGGLE_DURATION) {
    if (this.nameVisible == true) { return; }

    this.setUsername(text);
    this.setNameVisibility(true);

    setTimeout(() => {
      this.setNameVisibility(false);
    }, duration);
  }

  setNameVisibility(status) {
    this.nameVisible = status;
  }

  setUsername(name) {
    this.username = name;
  }

  setHeading(x, y) {
    this.heading = { x, y };
  }

  setDirectionChangeNotifier(cb) {
    this.notifyDirectionChange = cb;
  }

  addAnimations() {
    this.renderable.addAnimation("stand_left",  [10])
    this.renderable.addAnimation("walk_left",  [9, 10, 11], MOVEMENT_FRAME_SPEED);

    this.renderable.addAnimation("stand_right",  [4]);
    this.renderable.addAnimation("walk_right",  [3, 4, 5], MOVEMENT_FRAME_SPEED);

    this.renderable.addAnimation("stand_up",  [1]);
    this.renderable.addAnimation("walk_up",  [0, 1, 2], MOVEMENT_FRAME_SPEED);

    this.renderable.addAnimation("stand_down",  [7]);
    this.renderable.addAnimation("walk_down",  [6, 7, 8], MOVEMENT_FRAME_SPEED);

    this.renderable.setCurrentAnimation(`stand_${DEFAULT_DIRECTION}`);
  }

  moveLeft() {
    this.currentDirection = 'left';
    this.body.vel.x = -MOVEMENT_VELOCITY;
    this.body.vel.y = 0;

    if (!this.renderable.isCurrentAnimation('walk_left')) {
      this.renderable.setCurrentAnimation('walk_left');
      this.notifyDirectionChange(this.renderable.current.name);
    }
  }

  moveRight() {
    this.currentDirection = 'right';
    this.body.vel.x = MOVEMENT_VELOCITY;
    this.body.vel.y = 0;

    if (!this.renderable.isCurrentAnimation('walk_right')) {
      this.renderable.setCurrentAnimation('walk_right');
      this.notifyDirectionChange(this.renderable.current.name);
    }
  }

  moveUp() {
    this.currentDirection = 'up';
    this.body.vel.y = -MOVEMENT_VELOCITY;
    this.body.vel.x = 0;

    if (!this.renderable.isCurrentAnimation('walk_up')) {
      this.renderable.setCurrentAnimation('walk_up');
      this.notifyDirectionChange(this.renderable.current.name);
    }
  }

  moveDown() {
    this.currentDirection = 'down';
    this.body.vel.y = MOVEMENT_VELOCITY;
    this.body.vel.x = 0;

    if (!this.renderable.isCurrentAnimation('walk_down')) {
      this.renderable.setCurrentAnimation('walk_down');
      this.notifyDirectionChange(this.renderable.current.name);
    }
  }

  idle() {
    this.body.vel.x = 0;
    this.body.vel.y = 0;

    const animation = `stand_${this.currentDirection}`;
    if (!this.renderable.isCurrentAnimation(animation)) {
      this.renderable.setCurrentAnimation(animation);
      this.notifyDirectionChange(this.renderable.current.name);
    }
  }

  draw(context) {
    super.draw(context);
    if (this.nameVisible) {
      this.nameText.draw(context);
    }
  }
}