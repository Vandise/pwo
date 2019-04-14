import React from 'react';
import Events from 'Events/';
import * as Dispatcher from 'Util/dispatcher';

import Styles from 'Game/ui/styles/forms/messageConfirmForm';

export default class MessageConfirmForm extends React.Component {

  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    Dispatcher.dispatchAction(
      Dispatcher.actions.forms.TOGGLE_FORM('message', false)
    );
  }

  render() {
    return(
      <div className='message-form-container'>
        <header>
          <h3>{ this.props.content.heading }</h3>
        </header>
        <div className='input-container'>
          { this.props.content.body }
        </div>
        <div className='user-actions'>
          <a className='button login red' onClick={() => this.confirm() }>Ok</a>
        </div>
      </div>
    )
  }

}