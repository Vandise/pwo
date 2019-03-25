import { createAction } from 'redux-actions';

export const actions = {

  SET_STATUS: createAction('SET_STATUS', (status) => {
    return { status };
  }),

  SET_BOOTLOADER: createAction('SET_BOOTLOADER', (bootloader) => {
    return { bootloader };
  })
};