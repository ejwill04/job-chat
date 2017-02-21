import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ReactDOM from 'react-dom';

import './styles';
import Header from './components/Header/Header';
import AppContainer from './containers/AppContainer';
import LoginContainer from './containers/LoginContainer';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Router history={browserHistory}>
    <Route path='/' component={AppContainer}>
      <Route component={LoginContainer} path='/login' />
    </Route>
  </Router>
);

ReactDOM.render(<Provider store={store} >{router}</Provider>, document.querySelector('.application'));
