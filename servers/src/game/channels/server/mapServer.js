import Events from '../../../shared/events';
import getOriginID from '../../../shared/helpers/getOriginID';
import originPayload from '../../../shared/helpers/socketOriginPayload';
import Constants from '../../../shared/constants';

export default (server, socket) => {

  socket.on(Events.SERVER.MAPS.REGISTER_MAP_CONNECTION, (data) => {

    server.logger.info(`Registered Map Connection: ${data.name}`);

    server.maps[data.name] = socket.id;
  });

  socket.on(Events.SERVER.MAPS.GET_MAP_SERVER_DATA, (data) => {
    const originSocket = server.connections[getOriginID(data)];

    //
    // emit events only to others in the same world
    //
    originSocket.world = data.name;
    originSocket.join(data.name);

    //
    // send the response to the proper client
    //
    if (originSocket) {
      originSocket.emit(Events.SERVER.MAPS.GET_MAP_DATA,
        originPayload(Object.assign(data, { valid: true }), server.origin)
      );
    }
  });

};