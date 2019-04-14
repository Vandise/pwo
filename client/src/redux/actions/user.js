import { createAction } from 'redux-actions';

export default {

  SET_USER: createAction('SET_USER', (user) => {
    return { user };
  }),

};