import channels from '../channels/';

export default (server) => {

  server.io.on('connection', (socket) => {

    server.logger.info(`GameServer Connected: ${socket.id}`);

    server.gameservers[socket.id] = socket;

    Object.entries(channels).forEach(([ name, fn ]) => {
      fn(server, socket.id);
    });

    socket.on('disconnect', () => {
      server.logger.info(`GameServer Disconnected: ${socket.id}`);
      delete server.gameservers[socket.id];
    });

  });

  server.logger.info("Loaded Game Server Socket Extension.");
};