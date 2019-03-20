export default (server) => {

	server.app.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify({
      connections: 10
    }));
	});

  server.logger.info("Loaded API extension.");
};