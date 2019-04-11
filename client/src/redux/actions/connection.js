import { createAction } from 'redux-actions';

export default {

  SET_CONNECTION_STATUS: createAction('SET_CONNECTION_STATUS', (status) => {
    return { status };
  }),

};