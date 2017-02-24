import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ReactDOM, { render } from 'react-dom';

import AppContainer from './containers/AppContainer';
import LoginContainer from './containers/LoginContainer';
import Cities from './components/cities';
import Companies from './components/companies';
import CompanyContainer from './containers/CompanyContainer';
import './styles';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={AppContainer} >
      <Route path='/login' component={LoginContainer} />
      <Route path='/cities' component={Cities} />
      <Route path='/companies' component={Companies} />
      <Route path='/:name' component={CompanyContainer} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('main'));
