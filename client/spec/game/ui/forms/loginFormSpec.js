import React from 'react';
import { shallow, mount } from 'enzyme';

describe('Login Form', () => {

  let Form;
  let dispatcher;
  let wrapper;

  beforeEach(() => {
    dispatcher = require('Util/dispatcher');
    td.replace(dispatcher, 'dispatch', sinon.spy());

    Form = require('Game/ui/forms/loginForm').default;
  });

  afterEach(() => {
    td.reset();
  });

  describe('login action', () => {
    it('dispatches a LOGIN_ATTEMPT action', () => {
      wrapper = shallow(<Form />);

      wrapper.instance().login();

      expect(dispatcher.dispatch).to.have.been.called;
    });
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

    describe('when the submit button is clicked', () => {

      it('calls login', () => {
        const spy = sinon.spy();
        wrapper = mount(<Form />);

        spyOnComponentMethod(wrapper, 'login', spy);

        wrapper.find('a.button.login').simulate('click');

        expect(spy).to.have.been.called;
      });

    });
  });
});