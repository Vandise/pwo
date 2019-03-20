module.exports = {

  // events being emitted from the server / between servers

  SERVER: {
    AUTHENTICATION: {
      LOGIN_ATTEMPT: 'login_attempt_status',
    },

    CLIENT_VERSION: {
      CLIENT_VERIFICATION: 'client_verification_status'
    },

    MAPS: {
      REGISTER_MAP_CONNECTION: 'register_map_connection'
    }
  },

  // events coming from the client

  CLIENT: {
    AUTHENTICATION: {
      LOGIN_ATTEMPT: 'login_attempt',
    },

    CLIENT_VERSION: {
      CLIENT_VERIFICATION: 'client_verification'
    }
  }
};