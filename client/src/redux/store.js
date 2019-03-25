import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectionReducer, gameReducer } from './reducers';
import gameserverMiddleware from '../network/gameserver';

export const initialState = {};

export const store = createStore(combineReducers({ conn: connectionReducer, game: gameReducer }), initialState,
  applyMiddleware(thunk, gameserverMiddleware)
);