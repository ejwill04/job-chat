import React from 'react';
import LoginContainer from '../../containers/LoginContainer';
import { browserHistory } from 'react-router';

export class Login extends React.Component {
  render() {
    return (
      <div>
        Username:<input />
        Password:<input />
      </div>
    )
  }
}

export default LoginContainer(Login);
