import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';

import gameserverMiddleware from 'Network/gameserver';

export const initialState = {};

export const store = createStore(combineReducers(reducers), initialState,
  applyMiddleware(thunk, gameserverMiddleware)
);

export default store;