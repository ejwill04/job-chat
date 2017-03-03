import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
    };
    this.createUser = this.createUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { name, email, password } = this.state;
    e.preventDefault();
    if (email.length > 0 && password.length > 0 && this.validateEmail(email)) {
      this.userLogin(email, password, name);
      this.refs.email.value = '';
      this.refs.password.value = '';
    } else {
      this.props.setLoginErrorMessage('*Please enter a valid email address and password*');
      this.refs.email.focus();
    }
  }

  createUser() {
    const { name, email, password } = this.state;
    if (name.length > 0 && email.length > 0 && password.length > 0 && this.validateEmail(email)) {
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
        })
        .catch(() => this.props.setLoginErrorMessage('*An account with this email address already exists*'));
    }
    this.props.setLoginErrorMessage('*Please enter a valid name, email address and password*');
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
      this.props.setLoginErrorMessage('*Please enter a valid email address*');
      return false;
    } else {
      return true;
    }
  }

  validateUser(response) {
    response.json().then(
      payload => {
        if (payload.isValid) {
          let { name, password, email, _id } = payload.isValid;
          this.props.setActiveUser({ name, password, email });
          localStorage.setItem('activeUserId', JSON.stringify({ email, password, name, _id }));
          browserHistory.push('/');
        } else {
          this.props.setLoginErrorMessage('*Your email and password do not match*');
        }
      }
    );
  }

  render() {
    return (
      <form
        className='login-form'
        onSubmit={this.handleSubmit}
        >
        <TextField
          className='input-text'
          type='text'
          ref='name'
          floatingLabelText='Name'
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <TextField
          className='input-text'
          type='text'
          ref='email'
          floatingLabelText='Email'
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <TextField
          className='input-text'
          type='password'
          ref='password'
          floatingLabelText='Password'
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <div className='btn-container' >
          <RaisedButton
            className='btn btn-signup'
            type='button'
            label='Sign Up'
            onClick={this.createUser}
          />
          <Link to='/login'>
            <RaisedButton
              className='btn btn-login'
              type='submit'
              label='Have an account? Signin'
            />
          </Link>
        </div>
        <p className='status'>{this.props.errorMessage}</p>
      </form>
    );
  };
};

Signup.propTypes = {
  companies: React.PropTypes.array,
  errorMessage: React.PropTypes.string,
  setLoginErrorMessage: React.PropTypes.func,
  setActiveUser: React.PropTypes.func,
  deleteComment: React.PropTypes.func,
};

export default AppContainer(Signup);
