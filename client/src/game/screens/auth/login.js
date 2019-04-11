import * as dom from 'Util/dom';
import { dispatchAction, actions } from 'Util/dispatcher';

class LoginScreen extends dom.globals.me.Stage {

  renderLoginForm() {
    dispatchAction(actions.forms.TOGGLE_FORM('login', true));
  }

  onResetEvent() {
    const { me } = dom.globals;
    me.game.world.addChild(new me.ColorLayer("background", "#202020", 0), 0);
    this.renderLoginForm();
  }

  onDestroyEvent() {

  }

};

export default LoginScreen;