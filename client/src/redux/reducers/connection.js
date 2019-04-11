import { handleActions } from 'redux-actions';

export default handleActions({

  SET_CONNECTION_STATUS: (state, action) => {
    return {
      ...state,
      status: action.payload.status,
    };
  },
}, {
  status: false,
});