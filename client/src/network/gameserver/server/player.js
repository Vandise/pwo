import events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';
import * as Constants from 'Root/constants';
import Game from 'Game/';

export const dispatchUpdatePosition = (action, data, dispatch) => {
  const player = Game.getMainPlayerEntity();
  player.pos.x = data.position.x;
  player.pos.y = data.position.y;

  Dispatcher.dispatchAction(
    Dispatcher.actions.forms.SET_CONTENT('Invalid Movement', 'Your position was invalid and has been updated to the last known valid location.')
  ).then(() => {
    Dispatcher.dispatchAction(
      Dispatcher.actions.forms.TOGGLE_FORM('message', true)
    );
  });
};

const UPDATE_POSITION = {
  action: events.SERVER.PLAYER.UPDATE_POSITION,
  dispatch: dispatchUpdatePosition
};

export default [
  UPDATE_POSITION
];