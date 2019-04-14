import { handleActions } from 'redux-actions';

export default handleActions({
  TOGGLE_FORMS: (state, action) => {
    return Object.assign({}, state, action.payload.forms);
  },

  SET_CONTENT: (state, action) => {
    return Object.assign({}, state, { content: action.payload.content });
  },

}, {
  login: false,
  message: false,
  content: null
});