import * as Dispatcher from 'Util/dispatcher';

const action = 'connect';
const dispatch = (socket, store, next, action) => () => {
  Dispatcher.dispatchAction(
    Dispatcher.actions.connection.SET_CONNECTION_STATUS(true)
  );
  store.getState().melon.bootloader.preloadAssets();
};

export default {
  action,
  dispatch,
};