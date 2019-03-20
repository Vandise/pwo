import Constants from '../constants';
import Events from '../../../../shared/events';

export default (server, socketID) => {
  let socket = server.sessions[socketID];

  socket.on(Events.CLIENT.CLIENT_VERSION.CLIENT_VERIFICATION, (data) => {
    let s = false;

    if (Constants.CLIENT_VERSION === data.version) {
      s = true;
    }

    socket.emit(Events.SERVER.CLIENT_VERSION.CLIENT_VERIFICATION, { status: s });
  });
};