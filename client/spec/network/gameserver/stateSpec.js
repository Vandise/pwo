describe('GameServer Middleware', () => {

  let id;
  let mockSocket;
  let store;
  let mockMiddleware;
  let socketMiddleware;
  let dispatcher;


  const stubMiddleware = () => {
    const GameServerModule = require('Network/gameserver');

    store = require('Redux/').default.store;

    dispatcher = require('Util/dispatcher');
    td.replace(dispatcher, 'dispatchAction', sinon.stub())

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

  describe('State Events', () => {

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

    describe('connect', () => {

      beforeEach(() => {
        mockMiddleware(store)(() => true)({
          type: `${id}_state`, payload: { type: 'connect' }
        });
      });

      it('dispatches SET_CONNECTION_STATUS', () => {
        expect(dispatcher.dispatchAction).to.have.been.calledWith({ type: 'SET_CONNECTION_STATUS', payload: { status: true } });
      });

      it('triggers preloadAssets on the bootloader', () => {
        expect(store.getState().melon.bootloader.preloadAssets).to.have.been.called;
      });
    });

  });
});