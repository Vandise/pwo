var bunyan = require('bunyan');

/**
* Bunyan logger implementation
*/
export default class BunyanLogger {


  /**
  * Construct a BunyanLogger
  * @param {Object} params The logger parameters object
  */
  constructor(params){
    this.logger = bunyan.createLogger(params);
  }

  /**
  * Log the message as info
  * @param {String} message The message to display
  */
  info(message){
    this.logger.info(message);
  }

  /**
  * Log the message as debug
  * @param {String} message The message to display
  */
  debug(message){
    this.logger.debug(message);
  }

  /**
  * Log the message as warn
  * @param {String} message The message to display
  */
  warn(message){
    this.logger.warn(message);
  }

  /**
  * Log the message as error
  * @param {String} message The message to display
  */
  error(message){
    this.logger.error(message);
  }

}