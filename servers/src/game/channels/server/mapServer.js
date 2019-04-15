import Events from '../../../shared/events';
import getOriginID from '../../../shared/helpers/getOriginID';
import originPayload from '../../../shared/helpers/socketOriginPayload';
import Constants from '../../../shared/constants';

export default (server, socket) => {

  socket.on(Events.SERVER.MAPS.REGISTER_MAP_CONNECTION, (data) => {

    server.logger.info(`Registered Map Connection: ${data.name}`);

    server.maps[data.name] = socket.id;
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
      // broadcast to all others in the mapserver this person joined
      //
      originSocket.broadcast.to(originSocket.world).emit(Events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, originPayload({
        position: originSocket.player.position,
        velocity: { x: 0, y: 0 },
        playerID: originSocket.player.id,
        spritesheet: originSocket.player.spritesheet
      }, socket));
    }
  });

};