import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

const SEVER_VELOCITY = 2.5;
const POSITION_THRESHOLD = 5; // x-y margin of error for client-server position

const clientServerPositionCheck = (clientPosition, serverPosition, velocity) => {
  if (velocity.x == 0 && velocity.y == 0) {
    return true;
  }

  const xValid = (
    Math.abs(clientPosition.x) >= (Math.abs(serverPosition.x) - POSITION_THRESHOLD)
    && Math.abs(clientPosition.x) <= (Math.abs(serverPosition.x) + POSITION_THRESHOLD)
  );
  const yValid = (
    Math.abs(clientPosition.y) >= (Math.abs(serverPosition.y) - POSITION_THRESHOLD)
    && Math.abs(clientPosition.y) <= (Math.abs(serverPosition.y) + POSITION_THRESHOLD)
  );

  return (xValid && yValid);
};

export default (server, socketID) => {
  let socket = server.connections[socketID];
  let lastCommandTime = 0;
  let intervalTime = 10;

  socket.on(Events.CLIENT.PLAYER.UPDATE_POSITION, (data) => {

    const world = socket.world;
    const now = Date.now();
    const lag = now - data.time;
    const direction = data.direction;
    const velocity = data.velocity;
    const clientPosition = data.position;

/*
    server.logger.info(`=====================================================`);

    server.logger.info(`Player: ${socket.player.id}`);
    server.logger.info(`Direction: ${direction}`);
    server.logger.info(`Lag: ${lag}`);
    server.logger.info(`lastCommandTime: ${lastCommandTime}`);
    server.logger.info(`Velocity: ${JSON.stringify(velocity)}`);

    const secondsToTravel = (now - lastCommandTime) / 1000.0;

    server.logger.info(`secondsToTravel: ${secondsToTravel}`);
    server.logger.info(`Server Position: ${JSON.stringify(socket.player.position)}`);
    server.logger.info(`Client Position: ${JSON.stringify(clientPosition)}`);

    server.logger.info(`                                   `);
*/

    const positionValid = clientServerPositionCheck(clientPosition, socket.player.position, velocity)

    server.logger.info(`Position valid: ${positionValid}`);


    //
    // speed hack check
    //
    if ((lastCommandTime + intervalTime) > now || !positionValid) {
      server.logger.info(`Player: ${socket.player.id} - client movement velocity incorrect`);
      server.logger.info(`Server Position: ${JSON.stringify(socket.player.position)}`);
      server.logger.info(`Client Position: ${JSON.stringify(clientPosition)}`);

      socket.player.hackFlags.speedhack = true;

      return;
    }

    if(!socket.player.hackFlags.speedhack) {

      lastCommandTime = now;

      socket.player.position = clientPosition;

      //
      // tell the mapserver to update the player position
      // broadcast to all others in the mapserver
      //
      const mapConnID = server.maps[world];
      if (mapConnID) {
        const conn = server.connections[mapConnID];

        // DB update
        conn.emit(Events.SERVER.PLAYER.UPDATE_POSITION, originPayload(Object.assign({}, data, { playerID: socket.player.id }), socket));

        // broadcast to all other players on this mapserver
        // the direction and velocity
        // also notify the sending client of the calculated position -- odds are it off by ~ 1
      }

    } else {
      server.logger.info(`TODO: notify client of socket.player.position, remove speedhack flag, broadcast to others`);

      socket.emit(Events.SERVER.PLAYER.UPDATE_POSITION, originPayload({
        position: socket.player.position
      }, socket));

      socket.player.hackFlags.speedhack = false;
    }
  });
};