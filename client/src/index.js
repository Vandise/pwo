import redux from 'Redux/';
import * as dom from 'Util/dom';

export class Bootstrap {

  constructor() {
    const { me } = dom.globals;
    this.me = me;
    window.store = redux.store;
  }

  init() {
    this.initVideoBootScreen();
    this.debug();

    this.me.audio.init("mp3,ogg");
    this.me.sys.gravity = 0;

    this.me.loader.onload = this.loaded.bind(this);
  }

  preloadAssets() {

  }

  debug() {
    const { document } = dom.globals;

    if (document.location.hash === "#debug") {
      window.onReady(() => {
        me.utils.function.defer(me.plugin.register, this, me.debug.Panel, "debug");
      });
    }
  }

  initVideoBootScreen() {
    if (!this.me.video.init(600, 400, { wrapper: "screen", scale: 1.5, scaleMethod: "fill-max" })) {
      return;
    }

    this.drawBootSplash();
  }

  drawBootSplash() {
    const canvas = dom.globals.document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext("2d");

    const bg = new Image();
    bg.src = '/img/boot_bg.jpg';
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, 900, 600);
    };
  }

  loaded() {

  }

  static boot() {
    const bootstrap = new Bootstrap();
    bootstrap.init();
    return bootstrap;
  }
}

window.onReady(() => {
  Bootstrap.boot();
});