import * as socketMiddleware from 'socket.io-middleware';
import stateEvents from './state/';
import clientEvents from './client/';
import serverEvents from './server/';

export const stateActions = stateEvents;
export const clientActions = clientEvents;
export const serverActions = serverEvents;

export const middleware = socketMiddleware;
export const id = 'GS';

const initialSocket = null;

export default socketMiddleware.socketio(
  initialSocket,
  clientActions,
  serverActions,
  stateActions,
  id
);