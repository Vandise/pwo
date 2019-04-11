import { createAction } from 'redux-actions';

export default {

  SET_BOOTLOADER: createAction('SET_BOOTLOADER', (bootloader) => {
    return { bootloader };
  }),

  SET_GAME: createAction('SET_GAME', (game) => {
    return { game };
  })
};