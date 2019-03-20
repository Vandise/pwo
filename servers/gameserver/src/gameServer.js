import LoggerFactory from './util/logger/factory';
import express       from 'express';
import http          from 'http';
import socketio      from 'socket.io';
import ioClient      from 'socket.io-client';
import extensions    from './ext';

export default class GameServer {

  constructor(argv) {
    this.io       = null;
    this.env      = "dev";
    this.app      = express();
    this.conn     = null;
    this.root     = __dirname;
    this.port     = 54500;
    this.server   = http.createServer(this.app);

    this.sessions = {};
    this.maps = {};

    this.express  = express;

    this.loginPort    = 44500;
    this.loginHost    = 'localhost';
    this.lsSocket     = null;

    this.dsPort       = 55960;
    this.dsHost       = 'localhost';
    this.dsSocket     = null;

    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }

    if(argv.indexOf("-lh") != -1) { this.loginHost = argv[(argv.indexOf("-lh") + 1)]; }
    if(argv.indexOf("-lp") != -1) { this.loginPort = argv[(argv.indexOf("-lp") + 1)]; }

    if(argv.indexOf("-dh") != -1) { this.dsHost = argv[(argv.indexOf("-dh") + 1)]; }
    if(argv.indexOf("-dp") != -1) { this.dsPort = argv[(argv.indexOf("-dp") + 1)]; }

    this.logger = LoggerFactory.get('bunyan', {name:'GameServer', level: 'info'});
  }

  loadExtensions() {
    Object.entries(extensions).forEach(([ name, fn ]) => {
      fn(this);
    });
  }

  connectLoginServer() {
    let lsTimer   = null;
    const options = {
      transports: ['websocket'],
      timeout: 1000
    };

    this.lsSocket = ioClient.connect(`http://${this.loginHost}:${this.loginPort}`, options);

    this.logger.info(`Attempting to connect to LS: ${this.loginHost}:${this.loginPort}`);

    lsTimer = setInterval(() => {
      if (this.lsSocket.connected) {
        clearInterval(lsTimer);
        return;
      }
      if (!this.lsSocket.connected) {
        this.logger.info(`Unable to connect to LS: ${this.loginHost}:${this.loginPort}`);
        return;
      }
    }, 2000);
  }

  main() {
    this.app.set('port', this.port);
    this.io = socketio.listen(this.server);

    this.loadExtensions();
    this.connectLoginServer();

    this.server.listen(this.app.get('port'), () => {
      this.logger.info('GameServer listening on port '+this.app.get('port')+' in '+this.env+' mode');
    });

  }

  close() {
    this.lsSocket.disconnect(true);
    this.io.close();
    this.server.close();
  }

};