// utility for logging messages between sockets, user interactions, and redux -- similar to subscribe()
import redux from 'Redux/'

export const MAX_LOG = 50;
export const MESSAGE_LOG = [];

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
  redux.dispatch({ type, payload });
};