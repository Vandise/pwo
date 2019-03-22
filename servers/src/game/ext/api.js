import Constants from '../../shared/constants';

export default (server) => {

	server.app.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send(JSON.stringify({
      connections: Object.keys(server.connections).length,
      version: Constants.GAMESERVER.VERSION
    }));

	});

  server.logger.info("Loaded API extension.");
};