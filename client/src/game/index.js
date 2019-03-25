import resources from './resources';
import '../ext/melon/loader';

class Game {

  constructor() {
    this.resources = resources;
  }

}

const game = new Game();

export default game;