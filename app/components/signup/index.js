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
  }

  componentWillMount() {
    this.props.setLoginErrorMessage('');
    if (localStorage.length > 0) {
      browserHistory.push('/');
    }
  }

  createUser(e) {
    const { name, email, password } = this.state;
    if (name.length > 0 && email.length > 0 && password.length > 0 && this.validateEmail(email)) {
      e.preventDefault();
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
          localStorage.setItem('activeUserId', JSON.stringify({ email, password, name, _id }));
          this.props.setActiveUser({ name, password, email });
          browserHistory.push('/');
        })
        .catch(() => {
          this.props.setLoginErrorMessage('*An account with this email address already exists*');
          this.refs.email.focus();
        });
    } else {
      e.preventDefault();
      this.props.setLoginErrorMessage('*Please enter a valid name, email address and password*');
      this.refs.name.focus();
    }
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

  render() {
    return (
      <form
        className='login-form'
        onSubmit={this.createUser}
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
            type='submit'
            label='Sign Up'
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
