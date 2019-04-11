import ProgressBar from 'Game/components/loading/bar';
import MelonIcon from 'Game/components/loading/melonIcon';
import * as dom from 'Util/dom';

/*
  Primary Boot Screen to Login Menu
*/
class BootScreen extends dom.globals.me.Stage {

  onResetEvent() {
    const { me } = dom.globals;

    this.progressBar = new ProgressBar(
        25,
        0,
        me.video.renderer.getWidth() - 50,
        25
    );

    this.loaderHdlr = me.event.subscribe(
        me.event.LOADER_PROGRESS,
        this.progressBar.onProgressUpdate.bind(this.progressBar)
    );

    this.resizeHdlr = me.event.subscribe(
        me.event.VIEWPORT_ONRESIZE,
        this.progressBar.resize.bind(this.progressBar)
    );

    me.game.world.addChild(this.progressBar, 2);
  }

  onDestroyEvent() {
    const { me } = dom.globals;

    me.game.world.removeChild(this.progressBar.text);

    me.event.unsubscribe(this.loaderHdlr);
    me.event.unsubscribe(this.resizeHdlr);
    this.loaderHdlr = this.resizeHdlr = null;
  }
};

export default BootScreen;