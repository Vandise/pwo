import channels from '../channels/';

export default (server) => {
  server.io.on('connection', (socket) => {
    server.logger.info(`User Connected: ${socket.id}`);
    server.sessions[socket.id] = socket;

    socket.on('disconnect', () => {
      server.logger.info(`User Disconnected: ${socket.id}`);
      delete server.sessions[socket.id];
    });

    Object.entries(channels).forEach(([ name, fn ]) => {
      fn(server, socket.id);
    });
  });

  server.logger.info("Loaded Socket extension.");
};