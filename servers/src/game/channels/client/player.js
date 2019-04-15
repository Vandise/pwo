import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

export default (server, socketID) => {
  let socket = server.connections[socketID];
  let lastCommandTime = 0;
  let intervalTime = 100;

  socket.on(Events.CLIENT.PLAYER.UPDATE_POSITION, (data) => {

    const world = socket.world;
    const now = Date.now();
    const lag = now - data.time;
    const direction = data.direction;
    const velocity = data.velocity;
    const currentPosition = data.position;


    server.logger.info(`
      Player: ${socket.player.id} | 
      Direction: ${direction} | 
      Lag: ${lag} | 
      Velocity: ${velocity}
    `);

    //
    // speed hack check
    //
    if ((lastCommandTime + intervalTime) > now) {
      server.logger.info(`Player: ${socket.player.id} - client movement velocity incorrect`);
    } else {
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

    }
  });
};