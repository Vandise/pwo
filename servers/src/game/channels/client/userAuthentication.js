import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

export default (server, socketID) => {
  let socket = server.connections[socketID];

  //
  // emit the request to the login server
  //
  socket.on(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, (data) => {
    server.logger.info(`Login Attempt: ${data.username} from ${socket.id}`);

    server.lsSocket.emit(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT,
      originPayload(data, socket)
    );
  });
};