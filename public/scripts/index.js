import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, Link , browserHistory} from 'react-router';
import {Alert, AlertBox,AlertList, AlertForm, AlertModal} from './home';
import {RegistrationsForm} from './registrations';
import {SessionsForm} from './sessions';
import {App} from './app';


// url="api/alerts" pollInterval={2000}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/api/appUsers" component={RegistrationsForm} url="/api/appUsers"  />
    <Route path="/api/appUsers/login" component={SessionsForm} url="/api/appUsers/login"  />
    
  </Router>,
  document.getElementById('content')
);


