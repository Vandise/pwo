import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

const SEVER_VELOCITY = 2.5;
const POSITION_THRESHOLD = 120; // x-y margin of error for client-server position

//
//  TODO
//    speed hack check
//    (lastCommandTime + intervalTime) > now
//

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

        //
        // broadcast to all other players on this mapserver
        // the direction and velocity
        // also notify the sending client of the calculated position -- odds are it off by ~ 1
        //
        socket.broadcast.to(world).emit(Events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, originPayload({
          position: socket.player.position,
          velocity,
          playerID: socket.player.id,
          spritesheet: socket.player.spritesheet,
          type: 'move'
        }, socket));

      }

    } else {
      server.logger.info(`SpeedHack Flag`);
      socket.player.hackFlags.speedhack = false;
    }
  });
};