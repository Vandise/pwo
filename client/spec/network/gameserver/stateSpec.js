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

  describe('State Events', () => {

    beforeEach(() => {
      td.replace(store, 'dispatch', sinon.spy());
    });

    describe('connect', () => {

      it('dispatches SET_CONNECTION_STATUS', () => {
        mockMiddleware(store)(() => true)({
          type: `${id}_state`, payload: { type: 'connect' }
        });

        expect(store.dispatch).to.have.been.calledWith({ type: 'SET_CONNECTION_STATUS', payload: { status: true } });
      });
    });

  });
});