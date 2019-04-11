import React from 'react';
import { shallow, mount } from 'enzyme';

describe('Login Form', () => {

  let Form;
  let wrapper;

  beforeEach(() => {
    Form = require('Game/ui/forms/loginForm').default;
  });

  describe('form', () => {

    beforeEach(() => {
      wrapper = shallow(<Form />);
    });

    it('contains an account field', () => {
      expect(
        wrapper.find('input[name="account"]')
      ).to.have.lengthOf(1);
    });

    it('contains a password field', () => {
      expect(
        wrapper.find('input[name="password"]')
      ).to.have.lengthOf(1);
    });

    it('contains a submit button', () => {
      expect(
        wrapper.find('a.button.login')
      ).to.have.lengthOf(1);
    });

  });
});