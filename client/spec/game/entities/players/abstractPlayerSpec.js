import AbstractPlayer from 'Game/entities/players/abstractPlayer';

class ConcretePlayer extends AbstractPlayer {

};

describe('AbstractPlayer', () => {

  let concretePlayer;

  beforeEach(() => {
    concretePlayer = new ConcretePlayer(0, 0, {});
  });

  describe('on initialization', () => {
    it('sets the heading', () => {
      expect(concretePlayer.heading).to.deep.equal({ x: 0, y: 0 });
    });

    it('sets the current direction to "up"', () => {
      expect(concretePlayer.currentDirection).to.equal('up');
    });
  });

  describe('setHeading', () => {
    it('sets the current heading', () => {
      concretePlayer.setHeading(2, 2);
      expect(concretePlayer.heading).to.deep.equal({ x: 2, y: 2 });
    });
  });

  describe('setDirectionChangeNotifier', () => {
    it('sets the direction changed notifier', () => {
      concretePlayer.setDirectionChangeNotifier('test');
      expect(concretePlayer.notifyDirectionChange).to.equal('test');
    });
  });

  describe('addAnimations', () => {

    const animations = ['left', 'right', 'up', 'down'];

  	it('adds the stand animations', () => {
    	concretePlayer.addAnimations();
      animations.forEach((animation) => {
        expect(concretePlayer.renderable.addAnimation).to.have.been.calledWith(`stand_${animation}`);
      });
  	});

    it('adds the walk animations', () => {
    	concretePlayer.addAnimations();
      animations.forEach((animation) => {
        expect(concretePlayer.renderable.addAnimation).to.have.been.calledWith(`walk_${animation}`);
      });
    });
  });

  describe('setNameVisibility', () => {
  	it('sets the nameVisible status', () => {
    	concretePlayer.setNameVisibility(true);
    	expect(concretePlayer.nameVisible).to.equal(true);
  	});
  });

  describe('setUsername', () => {
  	it('sets the username', () => {
    	concretePlayer.setUsername('test');
    	expect(concretePlayer.username).to.equal('test');
  	});
  });

  describe('draw', () => {
    it('draws nameText when nameVisible', () => {

      const spy = sinon.spy(concretePlayer.nameText, 'draw');

      concretePlayer.setNameVisibility(true);
      concretePlayer.draw();

      expect(spy).to.have.been.called;
    });
  });

  describe('move', () => {

    beforeEach(() => {
      concretePlayer.renderable.isCurrentAnimation.returns(false);
      concretePlayer.notifyDirectionChange = sinon.spy();
    });

  	it('can move left', () => {
      concretePlayer.moveLeft();

      expect(concretePlayer.currentDirection).to.equal('left');
      expect(concretePlayer.body.vel.x).to.equal(-2.5);
      expect(concretePlayer.body.vel.y).to.equal(0);
      expect(concretePlayer.renderable.setCurrentAnimation).to.have.been.called;
      expect(concretePlayer.notifyDirectionChange).to.have.been.called;
  	});

  	it('can move right', () => {
      concretePlayer.moveRight();

      expect(concretePlayer.currentDirection).to.equal('right');
      expect(concretePlayer.body.vel.x).to.equal(2.5);
      expect(concretePlayer.body.vel.y).to.equal(0);
      expect(concretePlayer.renderable.setCurrentAnimation).to.have.been.called;
      expect(concretePlayer.notifyDirectionChange).to.have.been.called;
  	});

  	it('can move up', () => {
      concretePlayer.moveUp();

      expect(concretePlayer.currentDirection).to.equal('up');
      expect(concretePlayer.body.vel.y).to.equal(-2.5);
      expect(concretePlayer.body.vel.x).to.equal(0);
      expect(concretePlayer.renderable.setCurrentAnimation).to.have.been.called;
      expect(concretePlayer.notifyDirectionChange).to.have.been.called;
  	});

  	it('can move down', () => {
      concretePlayer.moveDown();

      expect(concretePlayer.currentDirection).to.equal('down');
      expect(concretePlayer.body.vel.y).to.equal(2.5);
      expect(concretePlayer.body.vel.x).to.equal(0);
      expect(concretePlayer.renderable.setCurrentAnimation).to.have.been.called;
      expect(concretePlayer.notifyDirectionChange).to.have.been.called;
  	});

    it('can be idle', () => {
      concretePlayer.idle();

      expect(concretePlayer.currentDirection).to.equal('up');
      expect(concretePlayer.body.vel.y).to.equal(0);
      expect(concretePlayer.body.vel.x).to.equal(0);
      expect(concretePlayer.renderable.setCurrentAnimation).to.have.been.called;
      expect(concretePlayer.notifyDirectionChange).to.have.been.called;
    });

    describe('when the current animation is playing', () => {
      it('does not fire off the notification', () => {
        concretePlayer.renderable.isCurrentAnimation.returns(true);
        concretePlayer.moveDown();

        expect(concretePlayer.notifyDirectionChange).to.not.have.been.called;
      });
    });
  });
});