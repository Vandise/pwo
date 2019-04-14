import events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';
import * as Constants from 'Root/constants';
import Game from 'Game/';

export const dispatch = (action, data, dispatch) => {
  if (data.success) {
    Dispatcher.dispatchAction(
      Dispatcher.actions.user.SET_USER(data.user)
    ).then((d) => {
      Game.transitionGameState(Constants.STATES.LOAD_WORLD);
    });

  }
};

export default {
  action: events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
  dispatch
};