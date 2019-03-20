/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _gameServer = __webpack_require__(2);

	var _gameServer2 = _interopRequireDefault(_gameServer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var GS = new _gameServer2.default(process.argv);

	  GS.main();

	  process.stdin.resume();

	  process.on('SIGINT', function () {
	    GS.close();
	    process.exit(2);
	  });
	})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _factory = __webpack_require__(3);

	var _factory2 = _interopRequireDefault(_factory);

	var _express = __webpack_require__(6);

	var _express2 = _interopRequireDefault(_express);

	var _http = __webpack_require__(7);

	var _http2 = _interopRequireDefault(_http);

	var _socket = __webpack_require__(8);

	var _socket2 = _interopRequireDefault(_socket);

	var _socket3 = __webpack_require__(9);

	var _socket4 = _interopRequireDefault(_socket3);

	var _ext = __webpack_require__(10);

	var _ext2 = _interopRequireDefault(_ext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameServer = function () {
	  function GameServer(argv) {
	    _classCallCheck(this, GameServer);

	    this.io = null;
	    this.env = "dev";
	    this.app = (0, _express2.default)();
	    this.conn = null;
	    this.root = __dirname;
	    this.port = 54500;
	    this.server = _http2.default.createServer(this.app);

	    this.sessions = {};
	    this.maps = {};

	    this.express = _express2.default;

	    this.loginPort = 44500;
	    this.loginHost = 'localhost';
	    this.lsSocket = null;

	    this.dsPort = 55960;
	    this.dsHost = 'localhost';
	    this.dsSocket = null;

	    if (argv.indexOf("-e") != -1) {
	      this.env = argv[argv.indexOf("-e") + 1];
	    }
	    if (argv.indexOf("-p") != -1) {
	      this.port = argv[argv.indexOf("-p") + 1];
	    }

	    if (argv.indexOf("-lh") != -1) {
	      this.loginHost = argv[argv.indexOf("-lh") + 1];
	    }
	    if (argv.indexOf("-lp") != -1) {
	      this.loginPort = argv[argv.indexOf("-lp") + 1];
	    }

	    if (argv.indexOf("-dh") != -1) {
	      this.dsHost = argv[argv.indexOf("-dh") + 1];
	    }
	    if (argv.indexOf("-dp") != -1) {
	      this.dsPort = argv[argv.indexOf("-dp") + 1];
	    }

	    this.logger = _factory2.default.get('bunyan', { name: 'GameServer', level: 'info' });
	  }

	  _createClass(GameServer, [{
	    key: 'loadExtensions',
	    value: function loadExtensions() {
	      var _this = this;

	      Object.entries(_ext2.default).forEach(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            name = _ref2[0],
	            fn = _ref2[1];

	        fn(_this);
	      });
	    }
	  }, {
	    key: 'connectLoginServer',
	    value: function connectLoginServer() {
	      var _this2 = this;

	      var lsTimer = null;
	      var options = {
	        transports: ['websocket'],
	        timeout: 1000
	      };

	      this.lsSocket = _socket4.default.connect('http://' + this.loginHost + ':' + this.loginPort, options);

	      this.logger.info('Attempting to connect to LS: ' + this.loginHost + ':' + this.loginPort);

	      lsTimer = setInterval(function () {
	        if (_this2.lsSocket.connected) {
	          clearInterval(lsTimer);
	          return;
	        }
	        if (!_this2.lsSocket.connected) {
	          _this2.logger.info('Unable to connect to LS: ' + _this2.loginHost + ':' + _this2.loginPort);
	          return;
	        }
	      }, 2000);
	    }
	  }, {
	    key: 'main',
	    value: function main() {
	      var _this3 = this;

	      this.app.set('port', this.port);
	      this.io = _socket2.default.listen(this.server);

	      this.loadExtensions();
	      this.connectLoginServer();

	      this.server.listen(this.app.get('port'), function () {
	        _this3.logger.info('GameServer listening on port ' + _this3.app.get('port') + ' in ' + _this3.env + ' mode');
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.lsSocket.disconnect(true);
	      this.io.close();
	      this.server.close();
	    }
	  }]);

	  return GameServer;
	}();

	exports.default = GameServer;
	;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _bunyan = __webpack_require__(4);

	var _bunyan2 = _interopRequireDefault(_bunyan);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoggerFactory = function () {
	  function LoggerFactory() {
	    _classCallCheck(this, LoggerFactory);
	  }

	  _createClass(LoggerFactory, null, [{
	    key: 'get',


	    /**
	    * Get a logger from its name or return null
	    * @param {String} name Name of the logger
	    * @param {Object} params Parameters of the logger
	    * @return {Object} The logger object or null if doesn't exist
	    */
	    value: function get(name, params) {
	      if (name.toLowerCase() === 'bunyan') {
	        return new _bunyan2.default(params);
	      }
	      return null;
	    }
	  }]);

	  return LoggerFactory;
	}();

	exports.default = LoggerFactory;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var bunyan = __webpack_require__(5);

	/**
	* Bunyan logger implementation
	*/

	var BunyanLogger = function () {

	  /**
	  * Construct a BunyanLogger
	  * @param {Object} params The logger parameters object
	  */
	  function BunyanLogger(params) {
	    _classCallCheck(this, BunyanLogger);

	    this.logger = bunyan.createLogger(params);
	  }

	  /**
	  * Log the message as info
	  * @param {String} message The message to display
	  */


	  _createClass(BunyanLogger, [{
	    key: 'info',
	    value: function info(message) {
	      this.logger.info(message);
	    }

	    /**
	    * Log the message as debug
	    * @param {String} message The message to display
	    */

	  }, {
	    key: 'debug',
	    value: function debug(message) {
	      this.logger.debug(message);
	    }

	    /**
	    * Log the message as warn
	    * @param {String} message The message to display
	    */

	  }, {
	    key: 'warn',
	    value: function warn(message) {
	      this.logger.warn(message);
	    }

	    /**
	    * Log the message as error
	    * @param {String} message The message to display
	    */

	  }, {
	    key: 'error',
	    value: function error(message) {
	      this.logger.error(message);
	    }
	  }]);

	  return BunyanLogger;
	}();

	exports.default = BunyanLogger;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("bunyan");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("socket.io");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("socket.io-client");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _api = __webpack_require__(11);

	var _api2 = _interopRequireDefault(_api);

	var _socket = __webpack_require__(12);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  api: _api2.default,
	  socket: _socket2.default
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (server) {

	  server.app.get('/', function (req, res) {
	    res.set('Content-Type', 'application/json');
	    res.setHeader("Access-Control-Allow-Origin", "*");
	    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    res.send(JSON.stringify({
	      connections: 10
	    }));
	  });

	  server.logger.info("Loaded API extension.");
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _channels = __webpack_require__(13);

	var _channels2 = _interopRequireDefault(_channels);

	var _mapServer = __webpack_require__(19);

	var _mapServer2 = _interopRequireDefault(_mapServer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server) {

	  server.io.of('/').on('connection', function (socket) {
	    server.logger.info('User Connected: ' + socket.id);
	    server.sessions[socket.id] = socket;

	    socket.on('disconnect', function () {
	      server.logger.info('User Disconnected: ' + socket.id);
	      delete server.sessions[socket.id];
	    });

	    Object.entries(_channels2.default).forEach(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          name = _ref2[0],
	          fn = _ref2[1];

	      fn(server, socket.id);
	    });
	  });

	  server.io.of('/mapserver').on('connection', function (socket) {

	    server.logger.info('MapServer Connected: ' + socket.id);

	    server.sessions[socket.id] = socket;

	    (0, _mapServer2.default)(server, socket);

	    socket.on('disconnect', function () {
	      server.logger.info('MapServer Disconnected: ' + socket.id);
	      delete server.sessions[socket.id];

	      Object.entries(server.maps).some(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2),
	            name = _ref4[0],
	            id = _ref4[1];

	        if (id == socket.id) {
	          delete server.maps[name];
	          return true;
	        }
	        return false;
	      });
	    });
	  });

	  server.logger.info("Loaded Socket extension.");
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _clientVerification = __webpack_require__(14);

	var _clientVerification2 = _interopRequireDefault(_clientVerification);

	var _userAuthentication = __webpack_require__(17);

	var _userAuthentication2 = _interopRequireDefault(_userAuthentication);

	var _maps = __webpack_require__(18);

	var _maps2 = _interopRequireDefault(_maps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  clientVerification: _clientVerification2.default,
	  maps: _maps2.default,
	  userAuthentication: _userAuthentication2.default
	};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(15);

	var _constants2 = _interopRequireDefault(_constants);

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server, socketID) {
	  var socket = server.sessions[socketID];

	  socket.on(_events2.default.CLIENT.CLIENT_VERSION.CLIENT_VERIFICATION, function (data) {
	    var s = false;

	    if (_constants2.default.CLIENT_VERSION === data.version) {
	      s = true;
	    }

	    socket.emit(_events2.default.SERVER.CLIENT_VERSION.CLIENT_VERIFICATION, { status: s });
	  });
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  CLIENT_VERSION: '0.0.1',
	  SERVER_VERSION: '0.0.1'
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

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
	    }
	  }
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server, socketID) {
	  var socket = server.sessions[socketID];

	  //
	  // emit the request to the login server
	  //
	  socket.on(_events2.default.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, function (data) {
	    server.lsSocket.emit(_events2.default.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, data);
	  });

	  //
	  // get the response from the login server and emit to the client
	  //
	  server.lsSocket.on(_events2.default.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, function (data) {
	    socket.emit(_events2.default.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, data);
	  });
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server, socketID) {
	  var socket = server.sessions[socketID];

	  //
	  // client request to get map data string
	  //
	  socket.on(_events2.default.CLIENT.MAPS.GET_MAP_DATA, function (data) {

	    var connID = server.maps[data.name];

	    // find map server socket
	    if (connID) {
	      var conn = server.sessions[connID];

	      // send the origin socket id
	      data['originID'] = socketID;

	      // emit to the map server the data request
	      conn.emit(_events2.default.SERVER.MAPS.GET_MAP_SERVER_DATA, data);
	    } else {

	      // invalid map name specified / requested / map unavailable
	      socket.emit(_events2.default.SERVER.MAPS.GET_MAP_DATA, {
	        valid: false
	      });
	    }
	  });
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(16);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server, socket) {

	  socket.on(_events2.default.SERVER.MAPS.REGISTER_MAP_CONNECTION, function (data) {
	    server.logger.info('Registered Map Connection: ' + data.name);
	    server.maps[data.name] = socket.id;
	  });

	  socket.on(_events2.default.SERVER.MAPS.GET_MAP_SERVER_DATA, function (data) {
	    var originSocket = server.sessions[data['originID']];

	    // send the response to the proper client
	    if (originSocket) {
	      originSocket.emit(_events2.default.SERVER.MAPS.GET_MAP_DATA, Object.assign(data, {
	        valid: true
	      }));
	    }
	  });
	};

/***/ })
/******/ ]);