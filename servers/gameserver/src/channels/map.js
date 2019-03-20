import Events from '../../../../shared/events';

export default (server, socketID) => {
  let socket = server.sessions[socketID];

  socket.on(Events.SERVER.MAPS.REGISTER_MAP_CONNECTION, (data) => {
    server.logger.info(`Registered Map Connection: ${data.name}`);
    server.maps[data.name] = data.socketID;
  });
};