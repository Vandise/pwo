import Constants from '../constants';

export default (server, socketID) => {
  let socket = server.sessions[socketID];

  socket.on('client_verification', (data) => {
    let s = false;

    if (Constants.CLIENT_VERSION === data.version) {
      s = true;
    }

    socket.emit('client_verification_status', { status: s });
  });
};