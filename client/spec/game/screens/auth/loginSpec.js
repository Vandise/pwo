import * as dom from 'Util/dom';

describe('LoginScreen', () => {

  let ls;
  let dispatcher;

  beforeEach(() => {

    dispatcher = require('Util/dispatcher');
    td.replace(dispatcher, 'dispatchAction', sinon.spy());

    const LoginScreen = require('Game/screens/auth/login').default;
    ls = new LoginScreen();
  });

  afterEach(() => {
    td.reset();
  });

  describe('onResetEvent', () => {

    beforeEach(() => ls.onResetEvent());

    it('hides the boot splash with a dark background', () => {
      expect(dom.globals.me.game.world.addChild).to.have.been.calledWith(
        new dom.globals.me.ColorLayer("background", "#202020", 0)
      );
    });

    it('renders the login form', () => {
      expect(dispatcher.dispatchAction).to.have.been.calledWith(
        dispatcher.actions.forms.TOGGLE_FORM('login', true)
      );
    });
  });

  describe('onDestroyEvent', () => {

    beforeEach(() => ls.onDestroyEvent());

    it('removes the login form', () => {
      expect(dispatcher.dispatchAction).to.have.been.calledWith(
        dispatcher.actions.forms.TOGGLE_FORM('login', false)
      );
    });
  });
});