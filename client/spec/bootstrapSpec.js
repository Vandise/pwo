import { Bootstrap } from 'Root/index';
import * as dom from 'Util/dom';

describe('Melon Bootstrapper', () => {

  let bootstrapper;

  describe('On initialization', () => {
    beforeEach(() => {
      bootstrapper = new Bootstrap();
      bootstrapper.init();
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
  });

  describe('when initializing the video', () => {
    describe('on success', () => {

      beforeEach(() => {
        dom.globals.me.video.init.returns(true);
        bootstrapper = new Bootstrap();
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
        bootstrapper.drawBootSplash = sinon.spy();
        bootstrapper.init();
      });

      it('does not render the spash screen', () => {
        expect(bootstrapper.drawBootSplash).to.not.have.been.called;
      });

    });
  });

});