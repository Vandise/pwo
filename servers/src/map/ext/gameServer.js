import Events from '../../shared/events';

export default (server) => {
  let socket = server.gsSocket;

  socket.on(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, (data) => {

    server.logger.info(`Getting map data for map ${data.name}`);

    //
    // this event already contains the origin id from the game server
    //
    socket.emit(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, Object.assign(data, {
      name: data.name,
      file: server.map,
      data: server.mapData
    }));

  });

};