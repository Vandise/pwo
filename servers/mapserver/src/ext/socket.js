export default (server) => {

  server.io.on('connection', (socket) => {

    server.logger.info(`Socket Connected: ${socket.id}`);
    server.connections[socket.id] = socket;

    socket.on('disconnect', () => {
      server.logger.info(`Socket Disconnected: ${socket.id}`);
      delete server.connections[socket.id];
    });

  });

  server.logger.info("Loaded Socket extension.");
};