import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, Link , browserHistory} from 'react-router';
import {Provider} from 'react-redux'
import {RegistrationsForm} from './registrations';
import {Alert, AlertBox,AlertList, AlertForm, AlertModal} from './home';
import {SessionsForm} from './sessions';
import {createStore} from 'redux'
import {rootReducer} from './reducers'
import {Routes} from './routes'

// url="api/alerts" pollInterval={2000}

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
      <Routes />
  </Provider>,
  document.getElementById('content')
);

