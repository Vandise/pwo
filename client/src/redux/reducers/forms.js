import { handleActions } from 'redux-actions';

export default handleActions({
  TOGGLE_FORMS: (state, action) => {
    return Object.assign({}, state, action.payload.forms);
  },
}, {
  login: false,
});