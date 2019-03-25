import { actions } from './actions';
import { store } from './store';

export default {
  actions,
  store,
  dispatch: store.dispatch
};