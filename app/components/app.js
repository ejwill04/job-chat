import React, { Component } from 'react';
import { Link } from 'react-router';
import AppContainer from '../containers/AppContainer';
import Login from './login';

export class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/companies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(response => response.json())
    .then(payload => console.log(payload));
  }

  toggleCityBtnPath() {
    return (
      <Link to='/cities'>
        <input
          className='btn'
          type='submit'
          value='Cities'
        />
      </Link>
    )
  }

  toggleCompaniesBtnPath() {
    return (
      <Link to='/companies'>
        <input
          className='btn'
          type='submit'
          value='Companies'
        />
      </Link>
    )
  }

  render () {
    return (
      <div>
        <h1>Neumann's Assistant</h1>
        {this.toggleCityBtnPath()}
        {this.toggleCompaniesBtnPath()}
        {this.props.children}
      </div>
    )
  }
}

export default AppContainer(App);
