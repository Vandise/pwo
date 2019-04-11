const action = 'connect';
const dispatch = (socket, store, next, action) => () => {
  console.log('Connected')
};

export default {
  action,
  dispatch,
};