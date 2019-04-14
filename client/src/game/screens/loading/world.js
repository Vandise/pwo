import ProgressBar from 'Game/components/loading/bar';
import MelonIcon from 'Game/components/loading/melonIcon';
import * as dom from 'Util/dom';

class LoadWorldScreen extends dom.globals.me.Stage {

  constructor(game) {
    super();
    this.game = game;
  }

  onResetEvent() {
    const { me } = dom.globals;


    console.log('WorldLoadingScreen', this.game);

  }

  onDestroyEvent() {

  }
};

export default LoadWorldScreen;