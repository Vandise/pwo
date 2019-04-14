import events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';
import * as Constants from 'Root/constants';
import Game from 'Game/';

export const dispatch = (action, data, dispatch) => {
  if (data.success) {
    return Dispatcher.dispatchAction(
      Dispatcher.actions.user.SET_USER(data.user)
    ).then(() => {
      Game.transitionGameState(Constants.STATES.LOAD_WORLD);
    });
  }

  return Dispatcher.dispatchAction(
    Dispatcher.actions.forms.SET_CONTENT('Invalid Credentials', 'Invalid username and password provided.')
  ).then(() => {
    Dispatcher.dispatchAction(
      Dispatcher.actions.forms.TOGGLE_FORM('message', true)
    );
  });
};

export default {
  action: events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
  dispatch
};