import Events from '../../../../shared/events';

export default (server, socketID) => {
  let socket = server.sessions[socketID];

  //
  // client request to get map data string
  //
  socket.on(Events.CLIENT.MAPS.GET_MAP_DATA, (data) => {

    const connID = server.maps[data.name];

    // find map server socket
    if (connID) {
      const conn = server.sessions[connID];

      // send the origin socket id
      data['originID'] = socketID;

      // emit to the map server the data request
      conn.emit(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, data);

    } else {

      // invalid map name specified / requested / map unavailable
      socket.emit(Events.SERVER.MAPS.GET_MAP_DATA, {
        valid: false
      });

    }
  });
};