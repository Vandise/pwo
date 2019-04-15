export default {

  LOG_LEVEL: 'info',
  ENVIRONMENT: 'development',

  GAMESERVER: {
    VERSION: '0.0.1',
    DEFAULT_PORT: 54500,
    HOST: 'localhost',
    PROTOCOL: 'http',
    DEFAULT_ID: 'GS-01'
  },

  LOGINSERVER: {
    VERSION: '0.0.1',
    DEFAULT_PORT: 44500,
    HOST: 'localhost',
    PROTOCOL: 'http',
    DEFAULT_ID: 'LS-01'
  },

  MAPSERVER: {
    VERSION: '0.0.1',
    DEFAULT_PORT: 52500,
    HOST: 'localhost',
    PROTOCOL: 'http',
    DEFAULT_ID: 'MS-01',
    MAP_DATA_PATH: '/Volumes/Macintosh HD/Users/benanderson/local/pokemon-world-online/maps',
    NAMESPACE: '/mapserver'
  },

  DATABASE: {
    development: {
      host: 'localhost',
      username: 'benanderson',
      password: '',
      database: 'pwo_development'
    }
  },

  CLIENT: {
    VERSION: '0.0.1',
    NAMESPACE: '/'
  },

  SOCKET: {
    ORIGIN_ID: 'originID'
  }
};