import { handleActions } from 'redux-actions';

export default handleActions({

  SET_USER: (state, action) => {
    return {
      ...state,
      user: Object.assign({}, action.payload.user)
    };
  },

}, {
  user: null,
});