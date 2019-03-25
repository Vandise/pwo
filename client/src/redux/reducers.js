import { handleActions } from 'redux-actions';

export const connectionReducer = handleActions({
  SET_STATUS: (state, action) => {
    return {
      ...state,
      status: action.payload.status,
    };
  },
}, {
  status: false,
});

export const gameReducer = handleActions({

  SET_BOOTLOADER: (state, action) => {
    return {
      ...state,
      bootloader: action.payload.bootloader
    };
  },

}, {
  bootloader: null
});