import LoggerFactory from '../../shared/util/logger/factory';
import express       from 'express';
import http          from 'http';
import socketio      from 'socket.io';
import ioClient      from 'socket.io-client';
import fs            from 'fs';
import extensions    from '../ext';
import Events from '../../shared/events';
import Constants from '../../shared/constants';

export default class MapServer {

  constructor(argv) {
    this.io       = null;
    this.env      = Constants.ENVIRONMENT;
    this.app      = express();

    this.serverID = Constants.MAPSERVER.DEFAULT_ID;

    this.port     = Constants.MAPSERVER.DEFAULT_PORT;
    this.server   = http.createServer(this.app);


    //
    // Connect one GS or many?
    //
    this.gsSocket = null;
    this.connections = {};

    this.express  = express;

    this.gameserverHost = Constants.GAMESERVER.HOST;
    this.gameserverPort = Constants.GAMESERVER.DEFAULT_PORT;
    this.gameserverProtocol = Constants.GAMESERVER.PROTOCOL;

    this.map = 'world_00.tmx';

    // the map data to be sent via socket
    this.mapData = null;

    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }
    if(argv.indexOf("-m") != -1) { this.map = argv[(argv.indexOf("-m") + 1)]; }
    if(argv.indexOf("-gh") != -1) { this.gameserverHost = argv[(argv.indexOf("-gh") + 1)]; }
    if(argv.indexOf("-gp") != -1) { this.gameserverPort = argv[(argv.indexOf("-gp") + 1)]; }

    this.logger = LoggerFactory.get('bunyan', { name:'MapServer', level: 'info' });
  }

  loadExtensions() {
    Object.entries(extensions).forEach(([ name, fn ]) => {
      fn(this);
    });
  }

  connectGameServer() {
    let lsTimer   = null;
    const options = {
      transports: ['websocket'],
      timeout: 1000,
      namespace: Constants.MAPSERVER.NAMESPACE
    };

    this.gsSocket = ioClient.connect(`${this.gameserverProtocol}://${this.gameserverHost}:${this.gameserverPort}${Constants.MAPSERVER.NAMESPACE}`, options);

    this.logger.info(`Attempting to connect to GameServer: ${this.gameserverHost}:${this.gameserverPort}`);

    lsTimer = setInterval(() => {
      if (this.gsSocket.connected) {

        //
        // register the map and socket to the server
        //
        this.gsSocket.emit(Events.SERVER.MAPS.REGISTER_MAP_CONNECTION, {
          name: this.map.split('.')[0]
        });

        this.loadExtensions();

        clearInterval(lsTimer);
        return;
      }

      if (!this.gsSocket.connected) {
        this.logger.info(`Unable to connect to GS: ${this.gameserverHost}:${this.gameserverPort}`);
        return;
      }

    }, 2000);
  }

  cacheMap() {
    const name = `${Constants.MAPSERVER.MAP_DATA_PATH}/${this.map}`;

    fs.readFile(name, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      this.mapData = data;
    });

  }

  main() {

    this.cacheMap();

    this.app.set('port', this.port);
    this.io = socketio.listen(this.server);

    this.connectGameServer();

    this.server.listen(this.app.get('port'), () => {
      this.logger.info('MapServer listening on port '+this.app.get('port')+' in '+this.env+' mode');
    });

  }

  close() {
    this.io.close();
    this.server.close();
  }

};