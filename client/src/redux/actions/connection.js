import { createAction } from 'redux-actions';

export const actions = {

  SET_CONNECTION_STATUS: createAction('SET_CONNECTION_STATUS', (status) => {
    return { status };
  }),

};