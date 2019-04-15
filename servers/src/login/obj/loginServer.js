import LoggerFactory from '../../shared/util/logger/factory';
import express       from 'express';
import http          from 'http';
import socketio      from 'socket.io';
import extensions    from '../ext';
import Constants from '../../shared/constants';

export default class LoginServer {

  constructor(argv) {
    this.io       = null;
    this.env      = Constants.ENVIRONMENT;
    this.app      = express();

    this.port     = Constants.LOGINSERVER.DEFAULT_PORT;
    this.serverID = Constants.LOGINSERVER.DEFAULT_ID;

    this.server   = http.createServer(this.app);
    this.db       = null;

    this.gameservers = {};


    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }
    if(argv.indexOf("-id") != -1) { this.serverID = argv[(argv.indexOf("-id") + 1)]; }

    this.logger = LoggerFactory.get('bunyan', { name:'LoginServer', level: Constants.LOG_LEVEL });
  }

  loadExtensions() {
    Object.entries(extensions).forEach(([ name, fn ]) => {
      fn(this);
    });
  }

  main() {
    this.app.set('port', this.port);
    this.io = socketio.listen(this.server);

    this.loadExtensions();

    this.server.listen(this.app.get('port'), () => {
      this.logger.info('LoginServer listening on port '+this.app.get('port')+' in '+this.env+' mode');
    });

  }

  close() {
    this.io.close();
    this.server.close();
  }

};