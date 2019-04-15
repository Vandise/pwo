import ProgressBar from 'Game/components/loading/bar';
import MelonIcon from 'Game/components/loading/melonIcon';
import * as dom from 'Util/dom';
import events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';

class WorldScreen extends dom.globals.me.Stage {

  constructor(game) {
    super();
    this.game = game;
  }

  enableControls() {
    const { me } = dom.globals;

    me.sys.pauseOnBlur = false;
    me.input.bindKey(me.input.KEY.LEFT,  "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP,    "up");
    me.input.bindKey(me.input.KEY.DOWN,  "down");
  }

  loadPlayer() {
    const { me } = dom.globals;
    const { user } = this.game.getState().user;

    const player = me.pool.pull('MainPlayer', user.position.x, user.position.y, {
      shapes: []
    });

    me.game.world.addChild(player);

    this.game.setMainPlayerEntity(player);
  }

  onResetEvent() {
    const { me } = dom.globals;

    this.enableControls();

    me.levelDirector.loadLevel(this.game.worldName);
    this.loadPlayer();
  }

  onDestroyEvent() {

  }
};

export default WorldScreen;