import { Client } from 'pg';
import Constants from '../../shared/constants';

export default (server) => {
  server.db = new Client(Constants.DATABASE[server.env]);
  server.db.connect((err) => {
    if (err) {
      server.logger.error("Failed to connect to Postgres DB", err.stack);
      return;
    }
    server.logger.info("Connected to Postgres.");
  });

  server.logger.info("Loaded Postgres DB.");
};