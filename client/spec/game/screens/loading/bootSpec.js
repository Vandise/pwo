import BootScreen from 'Game/screens/loading/boot';
import ProgressBar from 'Game/components/loading/bar';
import * as dom from 'Util/dom';

describe('BootScreen', () => {
  let bootscreen;

  beforeEach(() => {
    bootscreen = new BootScreen();
  });

  describe('onResetEvent', () => {

    beforeEach(() => {
      bootscreen.onResetEvent();
    });

    it('creates a progress bar', () => {
      expect(bootscreen.progressBar instanceof ProgressBar).to.equal(true);
    });

    it('subscribes the progress bar to LOADER_PROGRESS events', () => {
      expect(dom.globals.me.event.subscribe).to.have.been.calledWith(
        dom.globals.me.event.LOADER_PROGRESS
      );
    });

    it('subscribes the progress bar to VIEWPORT_ONRESIZE events', () => {
      expect(dom.globals.me.event.subscribe).to.have.been.calledWith(
        dom.globals.me.event.VIEWPORT_ONRESIZE
      );
    });

    it('adds the progress bar to the world at z-index 2', () => {
      expect(dom.globals.me.game.world.addChild).to.have.been.calledWith(bootscreen.progressBar, 2);
    })
  });

  describe('onDestroyEvent', () => {

    beforeEach(() => {
      bootscreen.onResetEvent();
      bootscreen.onDestroyEvent();
    });

    it('removes the progress bar from the world', () => {
      expect(dom.globals.me.game.world.removeChild).to.have.been.calledWith(bootscreen.progressBar);
    });
  });
});