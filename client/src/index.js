import Game from './game/';
import BootScreen from './game/screens/loading/boot';
import * as dom from './util/dom';

class Bootstrap {

  constructor() {

    const { me } = dom.globals;

    // Initialize the video.
    if (!me.video.init(600, 400, { wrapper: "screen", scale: 1.5, scaleMethod: "fill-max" })) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    } else {
      const canvas = document.getElementsByTagName("canvas")[0];
      const ctx = canvas.getContext("2d");

      const bg = new Image();
      bg.src = '/img/boot_bg.jpg';
      bg.onload = () => {
        ctx.drawImage(bg, 0, 0, 900, 600);
      };
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(() => {
        me.utils.function.defer(me.plugin.register, this, me.debug.Panel, "debug");
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    /*
    me.loader.preload(
      Game.resources.sprites
        .concat(Game.resources.items)
        .concat(Game.resources.tiles)
        .concat(Game.resources.tiles_animated)
    );

    Game.resources.worlds.some((world) => {
      if ( world['name'] ==  'world_00') {
        console.log('loading world', world);
        me.loader.preload([ world ]);
        return true;
      }
      return false;
    });
    */

    me.state.set(me.state.LOADING, new BootScreen());

    me.loader.preload(
      Game.resources.sprites
    );

    me.sys.gravity = 0;

    me.state.change(me.state.LOADING);
  }

  loaded() {
    console.log('loaded');

    /*
    me.state.set(me.state.WORLD_00, new OverworldScreen('world_00'));

    Object.keys(Game.entities).forEach((name) => {
      me.pool.register(name, Game.entities[name]);
    });

    me.state.change(me.state.WORLD_00);
    */
  }

  static boot()
  {
    const bootstrap = new Bootstrap();
    return bootstrap;
  }
}

window.onReady(() => {
  Bootstrap.boot();
});