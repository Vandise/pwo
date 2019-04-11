import resources from './resources';
import redux from 'Redux/';

class Game {

  constructor() {
    this.resources = resources;
  }

  getState() {
    return redux.store.getState();
  }

}

const game = new Game();

export default game;