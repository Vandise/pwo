import React from 'react';
import Events from 'Events/';
import { dispatch } from 'Util/dispatcher';

import Styles from 'Game/ui/styles/forms/loginForm';

export default class LoginForm extends React.Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  login(username, password) {
    dispatch(Events.CLIENT.AUTHENTICATION.LOGIN_ATTEMPT,
      { username, password }
    );
  }

  render() {
    return(
      <div className='login-form-container'>
        <header>
          <h3>Login</h3>
        </header>
        <div className='input-container'>
          <label htmlFor='account'>
            <div className='label-text'>Account</div>
            <input type='text' name='account' ref='account' />
          </label>
        </div>
        <div className='input-container'>
          <label htmlFor='password'>
            <div className='label-text'>Password</div>
            <input type='password' name='password' ref='password' />
          </label>
        </div>
        <div className='user-actions'>
          <a className='button login red' onClick={() => this.login(this.refs.account.value, this.refs.password.value) }>Ok</a>
        </div>
      </div>
    )
  }

}