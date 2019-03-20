import LoggerFactory from './util/logger/factory';
import express       from 'express';
import http          from 'http';
import socketio      from 'socket.io';
import ioClient      from 'socket.io-client';
import fs            from 'fs';
import extensions    from './ext';
import Events from '../../../shared/events';

export default class MapServer {

  constructor(argv) {
    this.io       = null;
    this.env      = "dev";
    this.app      = express();
    this.conn     = null;
    this.root     = __dirname;
    this.port     = 52500;
    this.server   = http.createServer(this.app);
    this.gsSocket = null;

    // if a direct socket connect is ever needed
    // possibly debug purposes?
    this.connections = {};

    this.express  = express;

    this.gameserverHost = 'localhost';
    this.gameserverPort = 54500;
    this.map = 'world_00.tmx';

    // the map data to be sent via socket
    this.mapData = null;

    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }
    if(argv.indexOf("-m") != -1) { this.map = argv[(argv.indexOf("-m") + 1)]; }
    if(argv.indexOf("-gh") != -1) { this.dsHost = argv[(argv.indexOf("-gh") + 1)]; }
    if(argv.indexOf("-gp") != -1) { this.dsPort = argv[(argv.indexOf("-gp") + 1)]; }

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
      namespace: '/mapserver'
    };

    this.gsSocket = ioClient.connect(`http://${this.gameserverHost}:${this.gameserverPort}/mapserver`, options);

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
    const name = `/Volumes/Macintosh HD/Users/benanderson/local/pokemon-world-online/shared/maps/${this.map}`;

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