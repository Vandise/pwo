import LoggerFactory from '../../shared/util/logger/factory';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import ioClient from 'socket.io-client';
import extensions from '../ext';
import Constants from '../../shared/constants';

export default class GameServer {

  constructor(argv) {
    this.io       = null;
    this.env      = Constants.ENVIRONMENT;
    this.app      = express();
    this.root     = __dirname;
    this.port     = Constants.GAMESERVER.DEFAULT_PORT;
    this.server   = http.createServer(this.app);
    this.serverID = Constants.GAMESERVER.DEFAULT_ID;

    this.connections = {};
    this.maps = {};

    this.loginPort = Constants.LOGINSERVER.DEFAULT_PORT;
    this.loginHost = Constants.LOGINSERVER.HOST;
    this.loginProtocol = Constants.LOGINSERVER.PROTOCOL;
    this.lsSocket = null;

    this.processArgs(argv);

    //
    // origin server to send on client responses
    //
    this.origin = {
      id: this.serverID
    };

    this.logger = LoggerFactory.get('bunyan', { name:'GameServer', level: Constants.LOG_LEVEL });
  }

  processArgs(argv) {
    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }
    if(argv.indexOf("-id") != -1) { this.serverID = argv[(argv.indexOf("-id") + 1)]; }

    if(argv.indexOf("-lh") != -1) { this.loginHost = argv[(argv.indexOf("-lh") + 1)]; }
    if(argv.indexOf("-lp") != -1) { this.loginPort = argv[(argv.indexOf("-lp") + 1)]; }
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

    this.lsSocket = ioClient.connect(`${this.loginProtocol}://${this.loginHost}:${this.loginPort}`, options);

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

    this.connectLoginServer();
    this.loadExtensions();

    this.server.listen(this.app.get('port'), () => {
      this.logger.info('GameServer listening on port '+this.app.get('port')+' in '+this.env+' mode');
    });

/*
    setInterval(() => {
      //console.log('/',  Object.keys(this.io.of('/').sockets) );
      //console.log('/mapserver',  Object.keys(this.io.of('/mapserver').sockets) );
      //console.log('world_00',  Object.keys(this.io.in('world_00').sockets) );
      //console.log('world_00                   : ', this.io.sockets.adapter.rooms['world_00']);
    }, 3000);
*/
  }

  close() {
    this.lsSocket.disconnect(true);
    this.io.close();
    this.server.close();

    Object.entries(this.connections).forEach(([id, socket]) => {
      socket.disconnect(true);
    });

    Object.entries(this.maps).forEach(([id, socket]) => {
      socket.disconnect(true);
    });
  }
};