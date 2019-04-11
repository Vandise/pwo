import * as Dispatcher from 'Util/dispatcher';

const action = 'connect';
const dispatch = (socket, store, next, action) => () => {
  Dispatcher.dispatchAction(
    Dispatcher.actions.connection.SET_CONNECTION_STATUS(true)
  );
};

export default {
  action,
  dispatch,
};