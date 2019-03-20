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

	var _loginServer = __webpack_require__(2);

	var _loginServer2 = _interopRequireDefault(_loginServer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var LS = new _loginServer2.default(process.argv);

	  LS.main();

	  process.stdin.resume();

	  process.on('SIGINT', function () {
	    LS.close();
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

	var _ext = __webpack_require__(9);

	var _ext2 = _interopRequireDefault(_ext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginServer = function () {
	  function LoginServer(argv) {
	    _classCallCheck(this, LoginServer);

	    this.io = null;
	    this.env = "dev";
	    this.app = (0, _express2.default)();
	    this.conn = null;
	    this.root = __dirname;
	    this.port = 4500;
	    this.server = _http2.default.createServer(this.app);
	    this.gameservers = {};
	    this.express = _express2.default;

	    if (argv.indexOf("-e") != -1) {
	      this.env = argv[argv.indexOf("-e") + 1];
	    }
	    if (argv.indexOf("-p") != -1) {
	      this.port = argv[argv.indexOf("-p") + 1];
	    }

	    this.logger = _factory2.default.get('bunyan', { name: 'LoginServer', level: 'info' });
	  }

	  _createClass(LoginServer, [{
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
	    key: 'main',
	    value: function main() {
	      var _this2 = this;

	      this.app.set('port', this.port);
	      this.io = _socket2.default.listen(this.server);

	      this.loadExtensions();

	      this.server.listen(this.app.get('port'), function () {
	        _this2.logger.info('LoginServer listening on port ' + _this2.app.get('port') + ' in ' + _this2.env + ' mode');
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.io.close();
	      this.server.close();
	    }
	  }]);

	  return LoginServer;
	}();

	exports.default = LoginServer;
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(10);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  socket: _socket2.default
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _channels = __webpack_require__(11);

	var _channels2 = _interopRequireDefault(_channels);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server) {

	  server.io.on('connection', function (socket) {

	    server.logger.info('Socket Connected: ' + socket.id);
	    server.gameservers[socket.id] = socket;

	    Object.entries(_channels2.default).forEach(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          name = _ref2[0],
	          fn = _ref2[1];

	      fn(server, socket.id);
	    });

	    socket.on('disconnect', function () {
	      server.logger.info('GameServer Disconnected: ' + socket.id);
	      delete server.gameservers[socket.id];
	    });
	  });

	  server.logger.info("Loaded Socket extension.");
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authentication = __webpack_require__(12);

	var _authentication2 = _interopRequireDefault(_authentication);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  authentication: _authentication2.default
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(13);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AUTH_FAILED_MSG = 'Invalid Credentials Provided';

	exports.default = function (server, socketID) {
	  var socket = server.gameservers[socketID];

	  socket.on(_events2.default.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, function (data) {

	    if (data.username != 'test' && data.password != 'test') {

	      server.logger.info('Authentication failed for user: ' + data.username);
	      socket.emit(_events2.default.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, {
	        success: false,
	        status: AUTH_FAILED_MSG
	      });
	    } else {

	      server.logger.info('Authentication successful for user: ' + data.username);
	      socket.emit(_events2.default.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, {
	        success: true,
	        user: {
	          characterName: 'Administrator'
	        }
	      });
	    }
	  });
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = {

	  // events being emitted from the server / between servers

	  SERVER: {
	    AUTHENTICATION: {
	      LOGIN_ATTEMPT: 'login_attempt_status',
	    },

	    CLIENT_VERSION: {
	      CLIENT_VERIFICATION: 'client_verification_status'
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

/***/ })
/******/ ]);