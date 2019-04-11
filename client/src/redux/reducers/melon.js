import { handleActions } from 'redux-actions';

export default handleActions({

  SET_BOOTLOADER: (state, action) => {
    return {
      ...state,
      bootloader: action.payload.bootloader
    };
  },

  SET_GAME: (state, action) => {
    return {
      ...state,
      game: action.payload.game
    };
  },

}, {
  bootloader: null,
  game: null
});