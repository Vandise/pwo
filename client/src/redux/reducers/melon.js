import { handleActions } from 'redux-actions';

export default handleActions({

  SET_BOOTLOADER: (state, action) => {
    return {
      ...state,
      bootloader: action.payload.bootloader
    };
  },

}, {
  bootloader: null
});