import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Information from './components/information';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';

import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, user persists on refresh/close
if (token) {
  store.dispatch({type: AUTH_USER}); //any action in here is sent off to all reducers in the application, just as with other dispatch
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Welcome} />
          <Route path='signin' component={Signin}></Route>
          <Route path='signup' component={Signup}></Route>
          <Route path='signout' component={Signout}></Route>
          <Route path='information' component={RequireAuth(Information)}></Route>
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
