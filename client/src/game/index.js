import resources from './resources';
import redux from 'Redux/';
import * as dom from 'Util/dom';
import MapLoader from 'Extensions/map/mapLoader';
import entities from 'Game/entities/';

//
// TODO: unit tests after refactoring / finalizing functionality
//
class Game {

  constructor() {
    this.resources = resources;
    this.worldName = null;
    this.entities = entities;
    this.mainPlayerEntity = null;
  }

  setMainPlayerEntity(entity) {
    this.mainPlayerEntity = entity;
  }

  getState() {
    return redux.store.getState();
  }

  transitionGameState(newState) {
    const { me } = dom.globals;
    me.state.change(newState);
  }

  getCurrentState() {
    const { me } = dom.globals;
    return me.state.current();
  }

  loadWorld(payload) {
    this.worldName = payload.name;
    MapLoader.loadTMXFromString(payload.name, payload.data);

    if (this.getCurrentState().notifyWorldChange) {
      this.getCurrentState().notifyWorldChange(this.worldName)
    }
  }
}

const game = new Game();

export default game;