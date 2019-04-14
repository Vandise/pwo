import { Bootstrap } from 'Root/index';
import * as dom from 'Util/dom';
import * as Constants from 'Root/constants';

describe('Melon Bootstrapper', () => {

  let bootstrapper;
  let dispatcher;

  describe('On initialization', () => {
    beforeEach(() => {
      bootstrapper = new Bootstrap();
      bootstrapper.connectToGameServer = sinon.spy();
      bootstrapper.init();
    });

    afterEach(() => {
      td.reset();
    });

    it('initializes audio', () => {
      expect(dom.globals.me.audio.init).to.have.been.calledWith('mp3,ogg');
    });

    it('sets the system gravity to 0', () => {
      expect(dom.globals.me.sys.gravity).to.equal(0);
    });

    it('binds the the loader.onload to the loaded method', () => {
      expect(
        dom.globals.me.loader.onload.toString()
      ).to.equal(
        bootstrapper.loaded.bind(bootstrapper).toString()
      );
    });

    it('registers the game states', () => {
      const set = dom.globals.me.state.set;
      expect(set).to.have.been.calledWith(me.state.LOADING);
      expect(set).to.have.been.calledWith(Constants.STATES.LOGIN);
    });

    it('transitions to the LOADING state', () => {
      expect(dom.globals.me.state.change).to.have.been.calledWith(me.state.LOADING);
    });

    it('connects to the game server', () => {
      expect(bootstrapper.connectToGameServer).to.have.been.called;
    });
  });

  describe('when initializing the video', () => {
    describe('on success', () => {

      beforeEach(() => {
        dom.globals.me.video.init.returns(true);
        bootstrapper = new Bootstrap();
        bootstrapper.connectToGameServer = sinon.spy();
        bootstrapper.drawBootSplash = sinon.spy();
        bootstrapper.init();
      });

      it('renders the spash screen', () => {
        expect(bootstrapper.drawBootSplash).to.have.been.called;
      });

    });

    describe('on failure', () => {

      beforeEach(() => {
        dom.globals.me.video.init.returns(false);
        bootstrapper = new Bootstrap();
        bootstrapper.connectToGameServer = sinon.spy();
        bootstrapper.drawBootSplash = sinon.spy();
        bootstrapper.init();
      });

      it('does not render the spash screen', () => {
        expect(bootstrapper.drawBootSplash).to.not.have.been.called;
      });

    });
  });

  describe('preloadAssets', () => {

    beforeEach(() => {
      bootstrapper = new Bootstrap();
      bootstrapper.connectToGameServer = sinon.spy();
      bootstrapper.drawBootSplash = sinon.spy();
    });

    it('preloads the game assets', () => {
      bootstrapper.preloadAssets();
      expect(dom.globals.me.loader.preload).to.have.been.called;
    });

  });

  describe('loaded', () => {
    beforeEach(() => {
      bootstrapper = new Bootstrap();
      bootstrapper.connectToGameServer = sinon.spy();
      bootstrapper.drawBootSplash = sinon.spy();
    });

    it('transitions to the LOGIN state', () => {
      bootstrapper.loaded();
      expect(dom.globals.me.state.change).to.have.been.calledWith(Constants.STATES.LOGIN);
    });
  });
});