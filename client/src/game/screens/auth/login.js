import * as dom from 'Util/dom';

class LoginScreen extends dom.globals.me.Stage {

  onResetEvent() {
    const { me } = dom.globals;
    me.game.world.addChild(new me.ColorLayer("background", "#202020", 0), 0);
  }

  onDestroyEvent() {

  }

};

export default LoginScreen;