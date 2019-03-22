import Events from '../../../shared/events';
import originPayload from '../../../shared/helpers/socketOriginPayload';

export default (server, socketID) => {
  let socket = server.connections[socketID];

  //
  // client request to get map data string
  //
  socket.on(Events.CLIENT.MAPS.GET_MAP_DATA, (data) => {

    const connID = server.maps[data.name];

    // find map server socket
    if (connID) {
      const conn = server.connections[connID];

      // send the origin client socket id
      // emit to the map server the data request
      conn.emit(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, originPayload(data, socket));

    } else {

      // invalid map name specified / requested / map unavailable
      socket.emit(Events.SERVER.MAPS.GET_MAP_DATA,
        originPayload({ valid: false }, server.origin)
      );

    }
  });
};