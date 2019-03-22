import Events from '../../shared/events';
import originPayload from '../../shared/helpers/socketOriginPayload';

const AUTH_FAILED_MSG = 'Invalid Credentials Provided';

export default (server, socketID) => {

  const socket = server.gameservers[socketID];

  socket.on(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, (data) => {

    if (data.username != 'test' || data.password != 'test') {

      server.logger.info(`Authentication failed for user: ${data.username}`);

      socket.emit(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
        originPayload({
          success: false,
          status: AUTH_FAILED_MSG
        }, socket)
      );

    } else {

      server.logger.info(`Authentication successful for user: ${data.username}`);

      socket.emit(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
        originPayload({
          success: true,
          user: {
            characterName: 'Administrator'
          }
        }, socket)
      );

    }
  });
};