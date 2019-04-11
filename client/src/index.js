import redux from 'Redux/';
import BootScreen from 'Game/screens/loading/boot';
import * as Constants from 'Root/constants';
import * as Dispatcher from 'Util/dispatcher';
import * as dom from 'Util/dom';
import { id } from 'Network/gameserver';

export class Bootstrap {

  constructor() {
    const { me } = dom.globals;
    this.me = me;
    window.store = redux.store;
  }

  init() {
    this.registerStates();
    this.initVideoBootScreen();
    this.debug();

    this.me.audio.init("mp3,ogg");
    this.me.sys.gravity = 0;

    this.me.loader.onload = this.loaded.bind(this);

    me.state.change(me.state.LOADING);

    this.connectToGameServer();
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

  registerStates() {
    this.me.state.set(me.state.LOADING, new BootScreen());
  }

  connectToGameServer() {
    Dispatcher.dispatch(
      `${id}_CONNECT`, { host: Constants.GS_HOST, port: Constants.GS_PORT }
    );
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