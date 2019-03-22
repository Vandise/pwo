import channels from '../channels/server';
import Constants from '../../shared/constants';

export default (server) => {

  server.io.of(Constants.MAPSERVER.NAMESPACE).on('connection', (socket) => {

    server.logger.info(`MapServer Connected: ${socket.id}`);

    server.connections[socket.id] = socket;

    Object.entries(channels).forEach(([ name, fn ]) => {
      fn(server, socket);
    });

    socket.on('disconnect', () => {

      server.logger.info(`MapServer Disconnected: ${socket.id}`);

      delete server.connections[socket.id];

      Object.entries(server.maps).some(([name, id]) => {
        if (id == socket.id) {
          delete server.maps[name];
          return true;
        }
        return false;
      });
    });

  });
};