import React, {Component, PropTypes} from 'react';
import {Router, Route, Link , browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {RegistrationsForm} from './registrations';
import {SessionsForm} from './sessions';
import App from './app';


export class Routes extends Component {

  render () {
    return (
            <Router history={browserHistory}>
              <Route path="/" component={App}/>
              <Route path="/api/appUsers" component={RegistrationsForm} url="/api/appUsers"  />
              <Route path="/api/appUsers/login" component={SessionsForm} url="/api/appUsers/login"  />
            </Router>
           ) 

    }


}

