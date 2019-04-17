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
    td.replace(game, 'transitionGameState', sinon.spy());
    td.replace(game, 'loadWorld', sinon.spy());
    td.replace(game, 'getMainPlayerEntity', sinon.stub());

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

    describe('GET_MAP_DATA', () => {

      let data;

      beforeEach(() => {
        dispatcher.dispatchAction.returns(Promise.resolve(true));
        data = { valid: true };
      });

      it('loads the world on success', () => {
        mockMiddleware(store)(() => true)({
          type: `${id}_*`, payload: {
            type: events.SERVER.MAPS.GET_MAP_DATA, data
          }
        });

        expect(game.loadWorld).to.have.been.calledWith(data);
      });

      it('displays the message confirm modal on failure', (done) => {
        mockMiddleware(store)(() => true)({
          type: `${id}_*`, payload: {
            type: events.SERVER.MAPS.GET_MAP_DATA, data: { valid: false }
          }
        });

        setTimeout(() => {
          expect(dispatcher.dispatchAction).to.have.been.calledWith(
            dispatcher.actions.forms.TOGGLE_FORM('message', true)
          );
          done();
        }, 100);
      });
    });

    describe('UPDATE_POSITION', () => {

      let player;

      beforeEach(() => {
        dispatcher.dispatchAction.returns(Promise.resolve(true));
        player = {
          pos: { x: 0, y:0 },
          body: { vel: { x: 0, y:0 } },
          setHeading: sinon.spy()
        };
        game.getMainPlayerEntity.returns(player);
      });

      it('forces a new player position', () => {
        const position = { x: 100, y: 100 };
        const velocity = {  x: 0, y:0 };
        mockMiddleware(store)(() => true)({
          type: `${id}_*`, payload: {
            type: events.SERVER.PLAYER.UPDATE_POSITION, data: { position, velocity }
          }
        });

        expect(player.pos).to.deep.equal(position);
      });

      describe('when displayNotification is present', () => {

        it('displays the message confirm modal', (done) => {
          const position = { x: 100, y: 100 };
          const velocity = {  x: 0, y:0 };
          mockMiddleware(store)(() => true)({
            type: `${id}_*`, payload: {
              type: events.SERVER.PLAYER.UPDATE_POSITION, data: { position , velocity, displayNotification: true }
            }
          });

          setTimeout(() => {
            expect(dispatcher.dispatchAction).to.have.been.calledWith(
              dispatcher.actions.forms.TOGGLE_FORM('message', true)
            );
            done();
          }, 100);
        });

      });
    });

    describe('UPDATE_OTHER_PLAYER', () => {
      const data = { playerID: 1, position: { x: 100, y: 100 }, velocity: {  x: 0, y:0 } };

      beforeEach(() => {
        td.replace(game, 'addOtherPlayer', sinon.stub());
        td.replace(game, 'getOtherPlayer', sinon.stub());
      });

      afterEach(() => {
        td.reset();
      });

      describe('when the player does not exist', () => {
        it('adds the player to the world', () => {
          game.getOtherPlayer.returns(null);

          mockMiddleware(store)(() => true)({
            type: `${id}_*`, payload: {
              type: events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, data
            }
          });

          expect(game.addOtherPlayer).to.have.been.called;
        });
      });

      describe('when the player does exist', () => {

        let player;

        beforeEach(() => {
          player = {
            move: sinon.spy(),
            setHeading: sinon.spy(),
            pos: { x: 0, y: 0 },
            body: { vel: { x: 1, y: 1 } }
          };

          game.getOtherPlayer.returns(player);
        });

        describe('when the update type is move', () => {

          it('calls move on the player', () => {
            mockMiddleware(store)(() => true)({
              type: `${id}_*`, payload: {
                type: events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, data: { type: 'move' }
              }
            });

            expect(player.move).to.have.been.called;
          });

        });

        describe('when the update type is setpos', () => {

          const position = { x: 10, y: 10 };
          const velocity = { x: 10, y: 10 };

          describe('and its forced', () => {

            it('updates the player', () => {
              mockMiddleware(store)(() => true)({
                type: `${id}_*`, payload: {
                  type: events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, data: { type: 'setpos', position, velocity, force: true }
                }
              });

              expect(player.pos.x).to.equal(position.x);
              expect(player.pos.y).to.equal(position.y);
              expect(player.body.vel.x).to.equal(velocity.x);
              expect(player.body.vel.y).to.equal(velocity.y);
              expect(player.setHeading).to.have.been.called;
            });

          });

          describe('when the player is moving', () => {
            it('does not update the player', () => {
              mockMiddleware(store)(() => true)({
                type: `${id}_*`, payload: {
                  type: events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, data: { type: 'setpos', position, velocity, force: false }
                }
              });
              expect(player.setHeading).to.not.have.been.called
            });
          });

          describe('when the player is not moving', () => {
            it('updates the player', () => {

              player.body.vel = { x: 0, y: 0 };

              mockMiddleware(store)(() => true)({
                type: `${id}_*`, payload: {
                  type: events.SERVER.PLAYER.UPDATE_OTHER_PLAYER, data: { type: 'setpos', position, velocity, force: false }
                }
              });

              expect(player.pos.x).to.equal(position.x);
              expect(player.pos.y).to.equal(position.y);
              expect(player.body.vel.x).to.equal(velocity.x);
              expect(player.body.vel.y).to.equal(velocity.y);
              expect(player.setHeading).to.have.been.called;
            });
          });

        });
      });
    });
  });
});