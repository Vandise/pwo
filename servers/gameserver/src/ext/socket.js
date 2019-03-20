import channels from '../channels/';
import mapChannel from '../channels/mapServer';

export default (server) => {

  server.io.of('/').on('connection', (socket) => {
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

  server.io.of('/mapserver').on('connection', (socket) => {

    server.logger.info(`MapServer Connected: ${socket.id}`);

    server.sessions[socket.id] = socket;

    mapChannel(server, socket);

    socket.on('disconnect', () => {
      server.logger.info(`MapServer Disconnected: ${socket.id}`);
      delete server.sessions[socket.id];

      Object.entries(server.maps).some(([name, id]) => {
        if (id == socket.id) {
          delete server.maps[name];
          return true;
        }
        return false;
      });
    });

  });

  server.logger.info("Loaded Socket extension.");
};