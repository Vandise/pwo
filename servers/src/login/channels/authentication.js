import Events from '../../shared/events';
import originPayload from '../../shared/helpers/socketOriginPayload';

const AUTH_FAILED_MSG = 'Invalid Credentials Provided';

export default (server, socketID) => {

  const socket = server.gameservers[socketID];

  socket.on(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, (data) => {

    //
    // TODO:
    //  sanitize & salt pws, poc only
    //
    server.db.query(`
      SELECT
        id, username, world, position, spritesheet
      FROM users
      WHERE
        username = $1
      AND
        password = $2
    `, [data.username, data.password]).then((result) => {

      if (result.rowCount == 0) {

        server.logger.info(`Authentication failed for user: ${data.username}`);

        socket.emit(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
          originPayload({
            success: false,
            status: AUTH_FAILED_MSG,
            userConnID: data.originID
          }, socket)
        );

      } else {
        const user = result.rows[0];

        server.logger.info(`Authentication successful for user: ${user.username}`);

        socket.emit(Events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT,
          originPayload({ success: true, user, userConnID: data.originID }, socket)
        );

      }
    });

  });
};