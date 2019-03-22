import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

export default (server, socketID) => {
  let socket = server.connections[socketID];

  //
  // emit the request to the login server
  //
  socket.on(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, (data) => {
    server.lsSocket.emit(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT,
      originPayload(data, socket)
    );
  });

  //
  // get the response from the login server and emit to the client
  //
  server.lsSocket.on(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, (data) => {
    socket.emit(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
      originPayload(data, server.lsSocket)
    );
  });
};