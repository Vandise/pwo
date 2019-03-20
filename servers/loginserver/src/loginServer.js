import LoggerFactory from './util/logger/factory';
import express       from 'express';
import http          from 'http';
import socketio      from 'socket.io';
import extensions    from './ext';

export default class LoginServer {

  constructor(argv) {
    this.io       = null;
    this.env      = "dev";
    this.app      = express();
    this.conn     = null;
    this.root     = __dirname;
    this.port     = 4500;
    this.server   = http.createServer(this.app);
    this.gameservers = {};
    this.express  = express;


    if(argv.indexOf("-e") != -1) { this.env = argv[(argv.indexOf("-e") + 1)]; }
    if(argv.indexOf("-p") != -1) { this.port = argv[(argv.indexOf("-p") + 1)]; }


    this.logger = LoggerFactory.get('bunyan', { name:'LoginServer', level: 'info' });
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