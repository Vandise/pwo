import ProgressBar from 'Game/components/loading/bar';
import * as dom from 'Util/dom';

describe('ProgressBar', () => {

  let pg;

  beforeEach(() => {
    pg = new ProgressBar(0, 0, 100, 25);
  });


  describe('on initialization', () => {

    it('is not invalidated', () => {
      expect(pg.invalidate).to.equal(false);
    });

    it('sets the progress to 0', () => {
      expect(pg.progress).to.equal(0);
    });

    it('sets the anchorPoint to 0,0', () => {
      expect(pg.anchorPoint.set).to.have.been.calledWith(0,0);
    });

    it('sets floating to true', () => {
      expect(pg.floating).to.equal(true);
    });

    it('sets the file to null', () => {
      expect(pg.file).to.equal(null);
    });

    it('renders plain text with "Connecting to server..."', () => {
      expect(pg.text.settings.text).to.equal('Connecting to server...');
    });

    it('adds the text to the world at z-index 3', () => {
      expect(dom.globals.me.game.world.addChild).to.have.been.calledWith(pg.text, 3);
    });
  });

  describe('onProgressUpdate', () => {
    beforeEach(() => {
      pg.onProgressUpdate(0.1, 'test.file');
    });

    it('invalidates the draw', () => {
      expect(pg.invalidate).to.equal(true);
    });

    it('sets the current file', () => {
      expect(pg.file).to.equal('test.file');
    });

    it('updates the progress', () => {
      expect(pg.progress).to.equal(10);
    });
  });

  describe('update', () => {
    describe('when invalidate', () => {
      it('updates', () => {
        pg.invalidate = true;
        expect(pg.update()).to.equal(true);
      });
    });

    describe('when not invalidate', () => {
      it('does not update', () => {
        pg.invalidate = false;
        expect(pg.update()).to.equal(false);
      });
    });
  });

  describe('draw', () => {

    let renderer;

    beforeEach(() => {
      renderer = new dom.globals.me.Renderable(0, 0, 10, 10);
      renderer.getColor.returns('blue');
      pg.file = {
        src: 'test.jpg'
      };

      pg.draw(renderer);
    });

    it('sets the renderer color to the text', () => {
      expect(renderer.setColor).to.have.been.calledWith(renderer.getColor());
      expect(renderer.setColor).to.have.been.calledWith('black');
      expect(renderer.setColor).to.have.been.calledWith('#55aa00');
    });

    it('sets the text to the current file src', () => {
      expect(pg.text.setText).to.have.been.calledWith(`Loading: ${pg.file.src}`);
    });

    it('draws the progress bar', () => {
      expect(renderer.fillRect).to.have.been.calledWith(0, 375, 100, 12.5);
    });
  });
});