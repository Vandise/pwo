import Events from '../../shared/events';
import Constants from '../../shared/constants';
import originPayload from '../../shared/helpers/socketOriginPayload';

export default (server) => {
  //
  // get the response from the login server and emit to the client
  //
  server.lsSocket.on(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, (data) => {

    const socket = server.connections[data.userConnID];

    if (data.success == true) {
      socket.player = {
        id: data.user.id,
        username: data.user.username,
        position: data.user.position,
        spritesheet: data.user.spritesheet,
        hackFlags: {
          speedhack: false
        }
      };
    }

    server.logger.info(`Emitted login response to client, success: ${data.success} from ${socket.id}`);

    socket.emit(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
      originPayload(data, server.lsSocket)
    );
  });
};