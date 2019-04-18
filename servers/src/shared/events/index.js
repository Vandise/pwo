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
      REGISTER_MAP_CONNECTION: 'register_map_connection',
      GET_MAP_SERVER_DATA: 'get_map_server_data',
      GET_MAP_DATA: 'get_map_data'
    },

    PLAYER: {
      UPDATE_POSITION: 'player_update_position',
      UPDATE_OTHER_PLAYER: 'player_update_other_position',
      DISCONNECTED: 'player_disconnected'
    }
  },

  // events coming from the client

  CLIENT: {
    AUTHENTICATION: {
      LOGIN_ATTEMPT: 'login_attempt',
    },

    CLIENT_VERSION: {
      CLIENT_VERIFICATION: 'client_verification'
    },

    MAPS: {
      GET_MAP_DATA: 'get_map_data'
    },

    PLAYER: {
      UPDATE_POSITION: 'player_update_position'
    }
  }
};