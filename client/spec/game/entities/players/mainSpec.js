import * as dom from 'Util/dom';
import * as Constants from 'Root/constants';
import events from 'Events/';

describe('MainPlayer', () => {

  let MainPlayer;
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

    MainPlayer = require('Game/entities/players/main').default;
    player = new MainPlayer(0, 0, settings);
  });

  describe('initialization', () => {
    it('sets the body velocity', () => {
    	expect(player.body.setVelocity).to.have.been.calledWith(2.5, 2.5);
    });

    it('sets the body friction', () => {
    	expect(player.body.setFriction).to.have.been.calledWith(0.4, 0.4);
    });

    it('always updates', () => {
      expect(player.alwaysUpdate).to.equal(true);
    });

    it('sets the anchor point', () => {
      expect(player.anchorPoint.set).to.have.been.calledWith(0.5, 0.5);
    });

    it('tells the viewport to follow this entity', () => {
      expect(dom.globals.me.game.viewport.follow).to.have.been.called;
    });
  });

  describe('handleMovement', () => {

    let spy;

    beforeEach(() => {
      dom.globals.me.input.isKeyPressed = sinon.stub();
      dom.globals.me.input.isKeyPressed.returns(false);
    });

    it('idles if no key is pressed', () => {
      spy = sinon.spy(player, 'idle');
      player.handleMovement();
      expect(spy).to.have.been.called;
    });

    it('moves left when the left key is pressed', () => {
      spy = sinon.spy(player, 'moveLeft');
      dom.globals.me.input.isKeyPressed.withArgs('left').returns(true);
      player.handleMovement();
      expect(spy).to.have.been.called;
    });

    it('moves right when the right key is pressed', () => {
      spy = sinon.spy(player, 'moveRight');
      dom.globals.me.input.isKeyPressed.withArgs('right').returns(true);
      player.handleMovement();
      expect(spy).to.have.been.called;
    });

    it('moves up when the up key is pressed', () => {
      spy = sinon.spy(player, 'moveUp');
      dom.globals.me.input.isKeyPressed.withArgs('up').returns(true);
      player.handleMovement();
      expect(spy).to.have.been.called;
    });

    it('moves down when the down key is pressed', () => {
      spy = sinon.spy(player, 'moveDown');
      dom.globals.me.input.isKeyPressed.withArgs('down').returns(true);
      player.handleMovement();
      expect(spy).to.have.been.called;
    });
  });

  describe('update', () => {

    let spy;

    it('handles movement', () => {
      spy = sinon.spy(player, 'handleMovement');
      player.update(Date.now());
      expect(spy).to.have.been.called;
    });

    it('updates the body', () => {
    	player.update(Date.now());
    	expect(player.body.update).to.have.been.called;
    });

    it('checks for collision', () => {
      player.update(Date.now());
      expect(dom.globals.me.collision.check).to.have.been.called;
    });

    it('calls the parent update function when velocity is 0', () => {
      spy = sinon.spy(MainPlayer.prototype, 'update');
      player.update(Date.now());
      expect(MainPlayer.prototype.update).to.have.been.called;
    });
  });
});