const action = 'connect';
const dispatch = (socket, store, next, action) => () => {
  store.getState().game.bootloader.preloadAssets();
};

export default {
  action,
  dispatch,
};