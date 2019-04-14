import resources from './resources';
import redux from 'Redux/';
import * as dom from 'Util/dom';

class Game {

  constructor() {
    this.resources = resources;
  }

  getState() {
    return redux.store.getState();
  }

  transitionGameState(newState) {
    const { me } = dom.globals;
    me.state.change(newState);
  }
}

const game = new Game();

export default game;