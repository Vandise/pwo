import Constants from '../../../shared/constants';
import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

export default (server, socketID) => {
  let socket = server.connections[socketID];

  socket.on(Events.CLIENT.CLIENT_VERSION.CLIENT_VERIFICATION, (data) => {
    let s = false;

    if (Constants.CLIENT_VERSION === data.version) {
      s = true;
    }

    socket.emit(Events.SERVER.CLIENT_VERSION.CLIENT_VERIFICATION, originPayload({ status: s }, server.origin));
  });
};