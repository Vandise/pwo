import * as dom from 'Util/dom';
import * as Constants from 'Root/constants';
import events from 'Events/';

describe('World Screen', () => {

  let screen;
  let game;

  beforeEach(() => {

    game = require('Game/').default;
    td.replace(game, 'setMainPlayerEntity', sinon.spy());
    td.replace(game, 'getState', () => {
      return {
        user: { user: { world: 'world_00', vel: {x: 0, y: 0}, position: { x: 0, y: 0 } } }
      };
    });
    td.replace(game, 'worldName', 'world_00');

    const WorldScreen = require('Game/screens/world').default;
    screen = new WorldScreen(game);
    td.replace(screen, 'enableControls', sinon.spy());
  });

  afterEach(() => td.reset());

  describe('loadPlayer', () => {

    let player;

    beforeEach(() => {
      player = { name: 'test', setUsername: sinon.spy(), setNameVisibility: sinon.spy() };
      dom.globals.me.pool.pull.returns(player);
      screen.loadPlayer();
    });

    it('pulls a new main player entity', () => {
      expect(dom.globals.me.pool.pull).to.have.been.calledWith('MainPlayer');
    });

    it('adds the player to the world', () => {
      expect(dom.globals.me.game.world.addChild).to.have.been.calledWith(player);
    });

    it('sets the username', () => {
      expect(player.setUsername).to.have.been.called;
    });
  });

  describe('onResetEvent', () => {
    beforeEach(() => {
      screen.onResetEvent();
    });

    it('enables controls', () => {
      expect(screen.enableControls).to.have.been.called;
    });

    it('loads the level', () => {
      expect(dom.globals.me.levelDirector.loadLevel).to.have.been.calledWith('world_00');
    });
  });
});