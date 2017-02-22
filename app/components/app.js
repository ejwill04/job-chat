import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header/Header'
import AppContainer from '../containers/AppContainer';

export class App extends Component {
  render () {
    return (
      <div>
        this is an app container
      </div>
    )
  }
}

export default AppContainer(App);
