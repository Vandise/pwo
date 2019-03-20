import Events from '../../../../shared/events';

export default (server, socket) => {

  socket.on(Events.SERVER.MAPS.REGISTER_MAP_CONNECTION, (data) => {
    server.logger.info(`Registered Map Connection: ${data.name}`);
    server.maps[data.name] = socket.id;
  });

  socket.on(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, (data) => {
    const originSocket = server.sessions[data['originID']];

    // send the response to the proper client
    if (originSocket) {
      originSocket.emit(Events.SERVER.MAPS.GET_MAP_DATA, Object.assign(data, {
        valid: true
      }));
    }
  });

};