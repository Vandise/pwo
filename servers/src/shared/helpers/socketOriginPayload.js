import Constants from '../constants';

export default (payload, socket) => {
  const origin = {};
  origin[Constants.SOCKET.ORIGIN_ID] = socket.id;

  return Object.assign({}, payload, origin);
};