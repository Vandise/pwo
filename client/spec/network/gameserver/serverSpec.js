import events from 'Events/';

describe('GameServer Middleware', () => {

  let id;
  let mockSocket;
  let store;
  let mockMiddleware;
  let socketMiddleware;
  let dispatcher;
  let game;

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

    dispatcher = require('Util/dispatcher');
    td.replace(dispatcher, 'dispatchAction', sinon.stub())

    game = require('Game/').default;
    td.replace(game, 'transitionGameState', sinon.spy())

    stubMiddleware();
  });

  afterEach(() => {
    td.reset();
  });

  describe('Server Events', () => {

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

      describe('on authentication success', () => {

        let data;

        beforeEach(() => {
          dispatcher.dispatchAction.returns(Promise.resolve(true));
          data = { success: true, user: { name: 'test' } };

          mockMiddleware(store)(() => true)({
            type: `${id}_*`, payload: {
              type: events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, data
            }
          });
        });

        it('sets the current user', () => {
          expect(dispatcher.dispatchAction).to.have.been.calledWith(
            dispatcher.actions.user.SET_USER(data.user)
          );
        });

        it('transitions to the world loading screen', (done) => {
          setTimeout(() => {
            expect(game.transitionGameState).to.have.been.called;
            done();
          }, 100);
        });

      });

      describe('on authentication failure', () => {

        let data;

        beforeEach(() => {
          dispatcher.dispatchAction.returns(Promise.resolve(true));
          data = { success: false, user: { name: 'test' } };

          mockMiddleware(store)(() => true)({
            type: `${id}_*`, payload: {
              type: events.SERVER.AUTHENTICATION.LOGIN_ATTEMPT, data
            }
          });
        });

        it('displays the message confirm modal', (done) => {
          setTimeout(() => {
            expect(dispatcher.dispatchAction).to.have.been.calledWith(
              dispatcher.actions.forms.TOGGLE_FORM('message', true)
            );
            done();
          }, 100);
        });

      });
    });

  });
});