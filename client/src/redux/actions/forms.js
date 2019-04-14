import { createAction } from 'redux-actions';

export default {

  TOGGLE_FORMS: createAction('TOGGLE_FORMS', (forms) => {
    return { forms };
  }),

  TOGGLE_FORM: createAction('TOGGLE_FORMS', (form, status) => {
    const payload = {};
    payload[form] = status;

    return { forms: payload };
  }),

  SET_CONTENT: createAction('SET_CONTENT', (heading, body) => {
    return { content: {
      heading,
      body
    } };
  })
};