import Events from '../../../../shared/events';

export default (server) => {
  let socket = server.gsSocket;

  socket.on(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, (data) => {
    socket.emit(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, {
      name: data.name,
      file: server.map,
      data: server.mapData,
      originID: data.originID,
    });
  });

};