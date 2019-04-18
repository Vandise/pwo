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
    this.readyStatus = false;
    window.game = this;
  }

  //
  // TODO:
  // not optimal to create a new sprite if the user disconnects
  // and there's events still coming in
  //
  addOtherPlayer(id, payload) {
    const player = dom.globals.me.pool.pull('OtherPlayer', payload.position.x, payload.position.y, {
      shapes: [],
      image: payload.spritesheet
    });

    player.name = id;
    player.setUsername(payload.username);
    player.setNameVisibility(true);

    dom.globals.me.game.world.addChild(player);
  }

  getOtherPlayer(name) {
    return dom.globals.me.game.world.getChildByName(name)[0];
  }

  removeOtherPlayer(name) {
    const player = dom.globals.me.game.world.getChildByName(name)[0];
    if (player) {
      dom.globals.me.game.world.removeChild(player);
    }
  }

  ready() {
    this.readyStatus = true;
  }

  getMainPlayerEntity() {
    return this.mainPlayerEntity;
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