import LoginScreen from 'Game/screens/auth/login';
import * as dom from 'Util/dom';

describe('LoginScreen', () => {

  let ls;

  beforeEach(() => {
    ls = new LoginScreen();
  });

  describe('onResetEvent', () => {

    beforeEach(() => ls.onResetEvent());

    it('hides the boot splash with a dark background', () => {
      expect(dom.globals.me.game.world.addChild).to.have.been.calledWith(
        new dom.globals.me.ColorLayer("background", "#202020", 0)
      );
    });
  });
});