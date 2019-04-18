import events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';
import * as Constants from 'Root/constants';
import Game from 'Game/';

/*
  
     UPDATE_POSITION
      parameters:
        position: { x, y }
        velocity: { x, y }
        displayNotification: true|false
  
*/

export const dispatchUpdatePosition = (action, data, dispatch) => {

  const player = Game.getMainPlayerEntity();

  if (!player) { return };

  if(player.body.vel.x == 0 && player.body.vel.y == 0) {
    player.pos.x = data.position.x;
    player.pos.y = data.position.y;
    player.body.vel.x = data.velocity.x;
    player.body.vel.y = data.velocity.y;
    player.setHeading(data.velocity.x, data.velocity.y);
  }

  if (data.displayNotification) {
    Dispatcher.dispatchAction(
      Dispatcher.actions.forms.SET_CONTENT('Invalid Movement', 'Your position was invalid and has been updated to the last known valid location.')
    ).then(() => {
      Dispatcher.dispatchAction(
        Dispatcher.actions.forms.TOGGLE_FORM('message', true)
      );
    });
  }
};

const UPDATE_POSITION = {
  action: events.SERVER.PLAYER.UPDATE_POSITION,
  dispatch: dispatchUpdatePosition
};

/*
  
     UPDATE_OTHER_PLAYER
        position: { x, y }
        velocity: { x, y }
        type: move|setpos      
  
*/

export const dispatchUpdateOtherPlayer = (action, data, dispatch) => {
  if (Game.readyStatus) {
    const player = Game.getOtherPlayer(`player_${data.playerID}`);
    if (player) {

      switch(data.type) {

        case 'move':
          player.move(data);
          break;

        case 'setpos':

          //
          // force update ie speed error
          //
          if(data.force == true) {

            //console.log('forced update for: ', player.name, JSON.stringify(player.body.vel));

            player.pos.x = data.position.x;
            player.pos.y = data.position.y;
            player.body.vel.x = data.velocity.x;
            player.body.vel.y = data.velocity.y;

            player.setHeading(data.velocity.x, data.velocity.y);
          } else {

            //console.log('non-forced update for: ', player.name, JSON.stringify(player.body.vel));

            //
            // not forceful, so only update players currently not moving
            // and have yet to register their position with the server
            //
            if(player.body.vel.x == 0 && player.body.vel.y == 0) {
              player.pos.x = data.position.x;
              player.pos.y = data.position.y;
              player.body.vel.x = data.velocity.x;
              player.body.vel.y = data.velocity.y;

              player.setHeading(data.velocity.x, data.velocity.y);
            }
          }

          break;

        default:
          return;
      }
    } else {
      Game.addOtherPlayer(`player_${data.playerID}`, data);
    }
  }
};

const UPDATE_OTHER_PLAYER = {
  action: events.SERVER.PLAYER.UPDATE_OTHER_PLAYER,
  dispatch: dispatchUpdateOtherPlayer
};


/*
  
    player disconnected
  
*/

export const dispatchPlayerDisconnected = (action, data, dispatch) => {
  const name = `player_${data.playerID}`;
  Game.removeOtherPlayer(name);
};

const PLAYER_DISCONNECTED = {
  action: events.SERVER.PLAYER.DISCONNECTED,
  dispatch: dispatchPlayerDisconnected
};

/*
  
    exports
  
*/

export default [
  UPDATE_POSITION,
  UPDATE_OTHER_PLAYER,
  PLAYER_DISCONNECTED
];