import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './loginForm';

export class FormManager extends React.Component {

  constructor(props) {
    super(props);

    this.forms = {
      login: LoginForm
    };
  }

  renderForms() {
    return Object.entries(this.forms).map(([ formName, View ]) => {
      if (this.props[formName]) {
        return ( <View key={formName} /> );
      }
      return null;
    })
  }

  render() {
    return (
      <div className='forms-container'>
        { this.renderForms() }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state.forms;
};

export default connect(mapStateToProps)(FormManager);