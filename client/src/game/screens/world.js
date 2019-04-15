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

  onResetEvent() {
    const { me } = dom.globals;

    this.enableControls();

    me.levelDirector.loadLevel(this.game.worldName);
  }

  onDestroyEvent() {

  }
};

export default WorldScreen;