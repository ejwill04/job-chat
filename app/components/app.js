import React, { Component } from 'react';
import { Link } from 'react-router';
import Login from './login';

export default class App extends Component {

  componentDidMount() {
    // call function here and get email and password
    fetch('http://localhost:3000/companies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': email + ":" + password
        // I will need to store email and password in localStorage or cookies
        // before every request, I will need to pass in the email and passwrod from localstorage
        //could this be a helper method?
      },
      method: 'GET',
    }).then(response => response.json())
    .then(payload => this.props.addCompanies(payload.companies));
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
