import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ReactDOM, { render } from 'react-dom';

import App from './components/app';
import Login from './components/login';
import Cities from './components/cities';
import Companies from './components/companies';
import Company from './components/company';
import './styles';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={App} >
      <Route path='/login' component={Login} />
      <Route path='/cities' component={Cities} />
      <Route path='/companies' component={Companies} />
      <Route path='/:company_name' component={Company} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('main'));
