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

	var _ext = __webpack_require__(9);

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
	    this.port = 9090;
	    this.server = _http2.default.createServer(this.app);
	    this.sessions = {};
	    this.express = _express2.default;

	    this.loginPort = 4500;
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
	    key: 'main',
	    value: function main() {
	      var _this2 = this;

	      this.app.set('port', this.port);
	      this.io = _socket2.default.listen(this.server);

	      this.loadExtensions();

	      this.server.listen(this.app.get('port'), function () {
	        _this2.logger.info('GameServer listening on port ' + _this2.app.get('port') + ' in ' + _this2.env + ' mode');
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _api = __webpack_require__(10);

	var _api2 = _interopRequireDefault(_api);

	var _socket = __webpack_require__(11);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  api: _api2.default,
	  socket: _socket2.default
	};

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _channels = __webpack_require__(12);

	var _channels2 = _interopRequireDefault(_channels);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server) {
	  server.io.on('connection', function (socket) {
	    server.logger.info('User Connected: ' + socket.id);
	    server.sessions[socket.id] = socket;

	    Object.entries(_channels2.default).forEach(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          name = _ref2[0],
	          fn = _ref2[1];

	      fn(server, socket.id);
	    });
	  });

	  server.logger.info("Loaded Socket extension.");
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _clientVerification = __webpack_require__(13);

	var _clientVerification2 = _interopRequireDefault(_clientVerification);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  clientVerification: _clientVerification2.default
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(14);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (server, socketID) {
	  var socket = server.sessions[socketID];

	  socket.on('client_verification', function (data) {
	    var s = false;

	    if (_constants2.default.CLIENT_VERSION === data.version) {
	      s = true;
	    }

	    socket.emit('client_verification_status', { status: s });
	  });
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  CLIENT_VERSION: '0.0.1',
	  SERVER_VERSION: '0.0.1'
	};

/***/ })
/******/ ]);