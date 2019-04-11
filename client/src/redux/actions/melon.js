import { createAction } from 'redux-actions';

export const actions = {

  SET_BOOTLOADER: createAction('SET_BOOTLOADER', (bootloader) => {
    return { bootloader };
  })

};