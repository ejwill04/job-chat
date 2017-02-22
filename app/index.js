import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ReactDOM, { render } from 'react-dom';

import Header from './components/Header/Header';
import App from './components/app';
import Login from './components/login';
import './styles';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={App} >
        <Route path='/login' component={Login} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('main'));
