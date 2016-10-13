import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, Link , browserHistory} from 'react-router';
import {Alert, AlertBox,AlertList, AlertForm, AlertModal} from './home';
import {RegistrationForm} from './registrations';



ReactDOM.render(
  <Router history={browserHistory}>
   <Route path="/" component={AlertBox} url="api/alerts" pollInterval={2000}/>
    <Route path="/api/appUsers" component={RegistrationForm} url="/api/appUsers"  />

  </Router>,
  document.getElementById('content')
);


