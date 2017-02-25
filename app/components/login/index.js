import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { browserHistory } from 'react-router';

export class Login extends React.Component {

  handleSubmit(e) {
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    e.preventDefault();
    if (email.length > 0 && password.length > 0 && this.validateEmail(email)) {
      this.userLogin(email, password, name);
      this.refs.email.value = '';
      this.refs.password.value = '';
    } else {
      this.refs.email.focus();
    }
  }

  createUser() {
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (this.validateEmail(email)) {
      fetch('http://localhost:3000/signup',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ name: name, email: email, password: password }),
        }).then(response => response.json())
        .then(payload => {
          const { email, password, name, _id } = payload.user;
          this.addNewUserToStore(email, password, name);
          localStorage.setItem('activeUserId', JSON.stringify({ email, password, name, _id }));
        });
    }
  }

  userLogin(email, password, name) {
    fetch('http://localhost:3000/login',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }).then(response =>
        this.validateUser(response));
  }

  addNewUserToStore(email, password, name) {
    const userData = { name, password, email };
    this.props.setActiveUser(userData);
    browserHistory.push('/');
  }

  validateEmail(email) {
    let emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailPattern.test(email)) {
      this.props.setLoginErrorMessage('*Please enter a valid email address');
      return false;
    } else {
      return true;
    }
  }

  validateUser(response) {
    const jsonResponse = response.json().then(
      payload => {
        if(payload.isValid) {
          let { name, password, email, _id } = payload.isValid;
          this.props.setActiveUser({ name, password, email });
          localStorage.setItem('activeUserId', JSON.stringify({ email, password, name, _id }));
          browserHistory.push('/');
        } else {
          this.props.setLoginErrorMessage('*Your email and password do not match*');
        }
      }
    )
  }

  render() {
    return (
      <form
        className='login-form'
        onSubmit={this.handleSubmit.bind(this)}
        >
        <input
          className='input-text'
          type='text'
          placeholder='name'
          ref='name'
        />
        <input
          className='input-text'
          type='text'
          placeholder='email'
          ref='email'
        />
        <input
          className='input-text'
          type='password'
          placeholder='password'
          ref='password'
        />
        <div className='btn-container' >
          <input
            className='btn btn-login'
            type='submit'
            value='Login'
          />
          <input
            className='btn btn-signup'
            type='button'
            value='Sign Up'
            onClick={this.createUser.bind(this)}
          />
        </div>
        <p className='status'>{this.props.errorMessage}</p>
      </form>
    );
  };
};

export default AppContainer(Login);
