import events from 'Events/';
import Game from 'Game/';
import * as Dispatcher from 'Util/dispatcher';

export const dispatch = (action, data, dispatch) => {
  if (data.valid) {
    Game.loadWorld(data);
    return;
  }

  return Dispatcher.dispatchAction(
    Dispatcher.actions.forms.SET_CONTENT('Unable to load world', 'MapServer connection failed. Please try again later')
  ).then(() => {
    Dispatcher.dispatchAction(
      Dispatcher.actions.forms.TOGGLE_FORM('message', true)
    );
  });
};

export default {
  action: events.SERVER.MAPS.GET_MAP_DATA,
  dispatch
};
