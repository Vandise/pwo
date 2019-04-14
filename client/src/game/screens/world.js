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

  onResetEvent() {
    const { me } = dom.globals;
    me.levelDirector.loadLevel(this.game.worldName);
  }

  onDestroyEvent() {

  }
};

export default WorldScreen;