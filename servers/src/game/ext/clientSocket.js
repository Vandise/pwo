import channels from '../channels/client';
import Constants from '../../shared/constants';

export default (server) => {

  server.io.of(Constants.CLIENT.NAMESPACE).on('connection', (socket) => {

    socket.world = null;
    socket.player = null;

    server.logger.info(`Client Connected: ${socket.id}`);

    server.connections[socket.id] = socket;

    socket.on('disconnect', () => {
      server.logger.info(`Client Disconnected: ${socket.id}`);
      delete server.connections[socket.id];
    });

    Object.entries(channels).forEach(([ name, fn ]) => {
      fn(server, socket.id);
    });
  });

  server.logger.info("Loaded Client Socket Extension.");
};