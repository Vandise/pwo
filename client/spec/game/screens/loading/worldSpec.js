import ProgressBar from 'Game/components/loading/bar';
import * as dom from 'Util/dom';
import * as Constants from 'Root/constants';
import events from 'Events/';

describe('WorldLoadingScreen', () => {

  let screen;
  let game;
  let dispatcher;

  beforeEach(() => {

    game = require('Game/').default;
    td.replace(game, 'transitionGameState', sinon.spy());

    dispatcher = require('Util/dispatcher');
    td.replace(dispatcher, 'dispatchAction', sinon.spy());

    const WorldScreen = require('Game/screens/loading/world').default;
    screen = new WorldScreen(game);
  });

  afterEach(() => td.reset());

  describe('loaded', () => {
    it('transitions to the world state', () => {
      screen.loaded();
      expect(game.transitionGameState).to.have.been.calledWith(Constants.STATES.WORLD);
    });
  });

  describe('notifyWorldChange', () => {
    beforeEach(() => {
      screen.notifyWorldChange('test');
    });

    it('sets the world name', () => {
      expect(screen.worldName).to.equal('test');
    });

    it('triggers the preloader', () => {
      expect(dom.globals.me.loader.preload).to.have.been.called;
    });
  });

  describe('onResetEvent', () => {

    beforeEach(() => {
      screen.onResetEvent();
    });

    it('creates a progress bar', () => {
      expect(screen.progressBar instanceof ProgressBar).to.equal(true);
    });

    it('subscribes the progress bar to LOADER_PROGRESS events', () => {
      expect(dom.globals.me.event.subscribe).to.have.been.calledWith(
        dom.globals.me.event.LOADER_PROGRESS
      );
    });

    it('adds the progress bar to the world at z-index 2', () => {
      expect(dom.globals.me.game.world.addChild).to.have.been.calledWith(screen.progressBar, 2);
    });

    it('gets the map data from the server', () => {
      expect(dispatcher.dispatchAction).to.have.been.calledWith({
        type: events.CLIENT.MAPS.GET_MAP_DATA,
        payload: {
          name: 'world_00'
        }
      });
    });
  });

  describe('onDestroyEvent', () => {

    beforeEach(() => {
      screen.onResetEvent();
      screen.onDestroyEvent();
    });

    it('removes the progress bar from the world', () => {
      expect(dom.globals.me.game.world.removeChild).to.have.been.calledWith(screen.progressBar);
    });
  });
});