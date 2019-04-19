import * as dom from 'Util/dom';
import * as Constants from 'Root/constants';
import events from 'Events/';

describe('Other Players', () => {

  let OtherPlayer;
  let player;
  let settings;

  beforeEach(() => {

    settings = {
      shapes: [],
      width: 0,
      height: 0,
      framewidth: 0,
      frameheight: 0
    };

    OtherPlayer = require('Game/entities/players/other').default;
    player = new OtherPlayer(0, 0, settings);
  });

  describe('move', () => {

    describe('when vel x is negative', () => {
    	it('moves left', () => {
        const spy = sinon.spy(player, 'moveLeft');

        player.move({ velocity: { x: -2.5, y: 0 } });

        expect(spy).to.have.been.called;
    	});
    });

    describe('when vel x is poitive', () => {
    	it('moves right', () => {
        const spy = sinon.spy(player, 'moveRight');

        player.move({ velocity: { x: 2.5, y: 0 } });

        expect(spy).to.have.been.called;
    	});
    });

    describe('when vel y is poitive', () => {
    	it('moves right', () => {
        const spy = sinon.spy(player, 'moveDown');

        player.move({ velocity: { y: 2.5, x: 0 } });

        expect(spy).to.have.been.called;
    	});
    });

    describe('when vel y is negative', () => {
    	it('moves right', () => {
        const spy = sinon.spy(player, 'moveUp');

        player.move({ velocity: { y: -2.5, x: 0 } });

        expect(spy).to.have.been.called;
    	});
    });

    describe('no velocity', () => {
    	it('idles', () => {
        const spy = sinon.spy(player, 'idle');

        player.move({ velocity: { y: 0, x: 0 } });

        expect(spy).to.have.been.called;
    	});
    });

  });

  describe('update', () => {
    it('sets the players velocity from the heading', () => {
      player.setHeading(5, 10);
      player.update(null);

      expect(player.body.vel.x).to.equal(5);
      expect(player.body.vel.y).to.equal(10);
    });
  });
});