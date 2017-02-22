import React from 'react';
import LoginContainer from '../../containers/LoginContainer';
import Header from '../Header/Header'
import { browserHistory } from 'react-router';

export class Login extends React.Component {
  render() {
    return (
      <div>
        <Header />
        This is the login page
      </div>
    )
  }
}

export default LoginContainer(Login);
