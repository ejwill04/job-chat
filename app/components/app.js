import React, { Component } from 'react';
import { Link } from 'react-router';
import AppContainer from '../containers/AppContainer';

export class App extends Component {

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
