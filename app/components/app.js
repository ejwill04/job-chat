import React, { Component } from 'react';
import { Link } from 'react-router';
// import Login from './login';
import { browserHistory } from 'react-router';

export default class App extends Component {

  componentWillMount() {
    if (localStorage.length === 0) {
      browserHistory.push('/login');
    }
  }

  componentDidMount() {
    if (localStorage.length > 0) {
      const getStorage = JSON.parse(localStorage.getItem('activeUserId'));
      const { email, password } = getStorage;
      fetch('http://localhost:3000/companies', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': email + ":" + password,
        },
        method: 'GET',
      }).then(response => response.json())
      .then(payload => this.props.addCompanies(payload.companies));
    }
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

  toggleLogoutBtn() {
    return (
      <input
        className='btn logout-btn'
        type='submit'
        value='Logout'
        onClick={() => this.clearLocalStorage()}
      />
    )
  }

  clearLocalStorage() {
    localStorage.clear();
    browserHistory.push('/login');
  }

  render () {
    return (
      <div>
        <h1>Neumann's Assistant</h1>
        {localStorage.length > 0 ? this.toggleCityBtnPath() : null}
        {localStorage.length > 0 ? this.toggleCompaniesBtnPath() : null}
        {localStorage.length > 0 ? this.toggleLogoutBtn() : null}
        {this.props.children}
      </div>
    )
  }
}
