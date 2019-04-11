import redux from 'Redux/';
import reduxActions from 'Redux/actions';

export const MAX_LOG = 50;
export const MESSAGE_LOG = [];

export const actions = reduxActions;

export function pushLog(type, payload, msg) {
  MESSAGE_LOG.unshift({
    type, payload, msg
  });

  if (MESSAGE_LOG.length > MAX_LOG) {
    MESSAGE_LOG.pop();
  }

  if (process.env.NODE_ENV == 'development') {
    console.log('Dispatcher Debug: ', type, payload, msg);
  }
}

export function dispatch(type, payload, debug) {
  exports.pushLog(type, payload, debug);
  redux.store.dispatch({ type, payload });
};

export function dispatchAction(action, debug) {
  exports.pushLog(action.type, action.payload, debug);
  redux.store.dispatch(action);
}