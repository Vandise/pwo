import redux from 'Redux/';

import BootScreen from 'Game/screens/loading/boot';
import LoginScreen from 'Game/screens/auth/login';
import WorldLoadingScreen from 'Game/screens/loading/world';
import WorldScreen from 'Game/screens/world';

import * as Constants from 'Root/constants';
import * as Dispatcher from 'Util/dispatcher';
import * as dom from 'Util/dom';
import { id } from 'Network/gameserver';
import Game from 'Game/';

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

    this.me.state.change(this.me.state.LOADING);

    this.connectToGameServer();
  }

  preloadAssets() {
    this.me.loader.preload(
      Game.resources.sprites
        .concat(Game.resources.text)
        .concat(Game.resources.tiles)
        .concat(Game.resources.tiles_animated)
    );
  }

  debug() {
    const { document } = dom.globals;

    //if (document.location.hash === "#debug") {
      window.onReady(() => {
        me.utils.function.defer(me.plugin.register, this, me.debug.Panel, "debugPanel");
      });
    //}
  }

  initVideoBootScreen() {
    if (!this.me.video.init(601, 451.8, { wrapper: "screen", scale: 1.66, scaleMethod: "fill-max" })) {
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
    this.me.state.set(this.me.state.LOADING, new BootScreen());
    this.me.state.set(Constants.STATES.LOGIN, new LoginScreen());
    this.me.state.set(Constants.STATES.LOAD_WORLD, new WorldLoadingScreen(Game));
    this.me.state.set(Constants.STATES.WORLD, new WorldScreen(Game));
  }

  connectToGameServer() {
    Dispatcher.dispatch(
      `${id}_CONNECT`, { host: Constants.GS_HOST, port: Constants.GS_PORT }
    );
  }

  loaded() {
    Game.gameText.addResources(
      dom.globals.me.loader.getJSON('gametext')
    );

    this.me.state.change(Constants.STATES.LOGIN);
  }

  static boot() {
    require('Game/ui/');
    require('Extensions/melon/loader');

    const bootstrap = new Bootstrap();
    bootstrap.init();

    Dispatcher.dispatchAction(
      redux.actions.melon.SET_BOOTLOADER(bootstrap)
    );

    Dispatcher.dispatchAction(
      redux.actions.melon.SET_GAME(Game)
    );

    return bootstrap;
  }
}

window.onReady(() => {
  Bootstrap.boot();
});