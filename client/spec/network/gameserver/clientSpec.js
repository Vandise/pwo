import events from 'Events/';

describe('GameServer Middleware', () => {

  let id;
  let mockSocket;
  let store;
  let mockMiddleware;
  let socketMiddleware;


  const stubMiddleware = () => {
    const GameServerModule = require('Network/gameserver');

    store = require('Redux/').default.store;

    socketMiddleware = GameServerModule.middleware;
    id = GameServerModule.id;
    mockMiddleware = GameServerModule.default;

    socketMiddleware.SOCKETS[id] = mockSocket;
    socketMiddleware.toggleInitStatus(id);
  };

  beforeEach(() => {
    mockSocket = {
      emit: sinon.spy(),
    };

    stubMiddleware();
  });

  describe('Client Events', () => {

    let state;

    beforeEach(() => {
      state = {
        melon: {
          bootloader: { preloadAssets: sinon.spy() }
        }
      };

      td.replace(store, 'dispatch', sinon.spy());
      td.replace(store, 'getState', () => {
        return state;
      });

      socketMiddleware.SOCKET_INITIALIZED[id] = true;
    });

    afterEach(() => {
      td.reset();
    });

    describe('LOGIN_ATTEMPT', () => {

      it('emits the LOGIN_ATTEMPT event', () => {
        const payload = {
          username: 'test',
          password: 'test'
        };
        mockMiddleware(store)(() => true)({ type: events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, payload });
        expect(mockSocket.emit).to.have.been.calledWith(events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT, payload);
      });

    });

  });
});