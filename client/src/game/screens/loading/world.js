import ProgressBar from 'Game/components/loading/bar';
import MelonIcon from 'Game/components/loading/melonIcon';
import * as dom from 'Util/dom';
import events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';
import Game from 'Game/';
import * as Constants from 'Root/constants';

class LoadWorldScreen extends dom.globals.me.Stage {

  constructor(game) {
    super();
    this.game = game;
    this.progressBar = null;
    this.loaderHdlr = null;
    this.worldName = null;
  }

  notifyWorldChange(worldName) {
    const { me } = dom.globals;

    this.worldName = worldName;

    me.loader.preload(
      Game.resources.sprites
        .concat(Game.resources.items)
        .concat(Game.resources.sprites)
    );
  }

  loaded() {
    const { me } = dom.globals;
    this.game.transitionGameState(Constants.STATES.WORLD);
  }

  onResetEvent() {
    const { me } = dom.globals;

    me.loader.onload = this.loaded.bind(this);

    this.progressBar = new ProgressBar(
        25,
        0,
        me.video.renderer.getWidth() - 50,
        25,
        'Loading world...'
    );

    this.loaderHdlr = me.event.subscribe(
        me.event.LOADER_PROGRESS,
        this.progressBar.onProgressUpdate.bind(this.progressBar)
    );

    me.game.world.addChild(this.progressBar, 2);

    // world is hard-coded for now
    // it will come from the user state
    Dispatcher.dispatchAction({
      type: events.CLIENT.MAPS.GET_MAP_DATA,
      payload: {
        name: 'world_00'
      }
    });
  }

  onDestroyEvent() {

    const { me } = dom.globals;
    me.game.world.removeChild(this.progressBar.text);
    me.game.world.removeChild(this.progressBar);

    me.event.unsubscribe(this.loaderHdlr);

    this.loaderHdlr = null;
  }
};

export default LoadWorldScreen;