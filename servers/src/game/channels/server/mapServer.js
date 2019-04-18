import Events from '../../../shared/events';
import getOriginID from '../../../shared/helpers/getOriginID';
import originPayload from '../../../shared/helpers/socketOriginPayload';
import Constants from '../../../shared/constants';

const TWEEN_PLAYER_POSITIONS_INT = 2000;
const ZERO_VELOCITY = { x: 0, y: 0 };

//
// notify all sockets in the world of their current server positions
// should probably put this loop on the MapServer -> notify GameServer
//
const tweenPlayerPositions = (server, world) => {
  setInterval(() => {

    server.logger.info(`Notifying Sockets of Server Positions - ${world}`);

    let worldRoom = server.io.sockets.adapter.rooms[world];
    if (worldRoom) {
      for( let currentID in worldRoom.sockets ) {

        const currentSocket = server.connections[currentID];
        const payload = {
          position: currentSocket.player.position,
          velocity: ZERO_VELOCITY,
          playerID: currentSocket.player.id,
          spritesheet: currentSocket.player.spritesheet,
          username: currentSocket.player.username,
          type: 'setpos',
          force: false
        };

        currentSocket.emit(Events.SERVER.PLAYER.UPDATE_POSITION, originPayload(payload, currentSocket));
        emitUpdateOtherPlayer(currentSocket, payload, currentSocket, world);

      }
    }
  }, TWEEN_PLAYER_POSITIONS_INT);
};

const emitUpdateOtherPlayer = (socket, payload, originSocket, world = null) => {
  if (world) {
    return socket.broadcast.to(world).emit(
      Events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, originPayload(payload, originSocket));
  }
  return socket.emit(Events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, originPayload(payload, originSocket));
};

export default (server, socket) => {

  socket.on(Events.SERVER.MAPS.REGISTER_MAP_CONNECTION, (data) => {

    server.logger.info(`Registered Map Connection: ${data.name}`);

    server.maps[data.name] = socket.id;

    tweenPlayerPositions(server, data.name);
  });

  socket.on(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, (data) => {
    const originSocket = server.connections[getOriginID(data)];

    //
    // emit events only to others in the same world
    //
    originSocket.world = data.name;
    originSocket.join(data.name);

    //
    // send the response to the proper client
    //
    if (originSocket) {

      //
      // send map data to client
      //
      originSocket.emit(Events.SERVER.MAPS.GET_MAP_DATA,
        originPayload(Object.assign(data, { valid: true }), server.origin)
      );

      //
      // add other players to client
      //

      const connectionsInWorld = server.io.sockets.adapter.rooms[originSocket.world].sockets;
      for( let id in  connectionsInWorld ) {
        if ( id != originSocket.id) {
          const otherPlayerSocket = server.connections[id];

          originSocket.emit(Events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, originPayload({
            position: otherPlayerSocket.player.position,
            velocity: ZERO_VELOCITY,
            playerID: otherPlayerSocket.player.id,
            spritesheet: otherPlayerSocket.player.spritesheet,
            username: otherPlayerSocket.player.username,
            type: 'setpos',
            force: false
          }, socket));

        }
      }

      //
      // broadcast to all others in the mapserver this person joined
      //
      originSocket.broadcast.to(originSocket.world).emit(Events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, originPayload({
        position: originSocket.player.position,
        velocity: ZERO_VELOCITY,
        playerID: originSocket.player.id,
        spritesheet: originSocket.player.spritesheet,
        username: originSocket.player.username,
        type: 'setpos',
        force: false
      }, socket));
    }
  });

};