import React from 'react';
import { shallow, mount } from 'enzyme';

describe('Login Form', () => {

  let Form;
  let dispatcher;
  let wrapper;
  let props = { content: {
    heading: 'test heading',
    body: 'this is the body'
  } };

  beforeEach(() => {
    dispatcher = require('Util/dispatcher');
    td.replace(dispatcher, 'dispatchAction', sinon.spy());

    Form = require('Game/ui/forms/messageConfirmForm').default;
  });

  afterEach(() => {
    td.reset();
  });

  describe('confirm action', () => {
    it('closes the form', () => {
      wrapper = shallow(<Form {...props} />);

      wrapper.instance().confirm();

      expect(dispatcher.dispatchAction).to.have.been.called;
    });
  });

  describe('form', () => {

    beforeEach(() => {
      wrapper = shallow(<Form {...props} />);
    });

    it('renders the heading', () => {
      expect(
        wrapper.text()
      ).to.contain(props.content.heading);
    });

    it('renders the body', () => {
      expect(
        wrapper.text()
      ).to.contain(props.content.body);
    });

    describe('when the confirm button is clicked', () => {

      it('calls confirm', () => {
        const spy = sinon.spy();
        wrapper = mount(<Form {...props} />);

        spyOnComponentMethod(wrapper, 'confirm', spy);

        wrapper.find('a.button.confirm').simulate('click');

        expect(spy).to.have.been.called;
      });

    });
  });
});