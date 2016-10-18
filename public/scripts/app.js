import React, {Component, PropTypes} from 'react';
import {Router, Route, Link , browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {RegistrationsForm} from './registrations';
import {SessionsForm} from './sessions';

export class App extends Component {

  render () {
    return (
            <div>
              <div className="row">
                <ul>
                   <Link to="/api/appUsers" className='btn btn-primary pull-right '  >Registration</Link>
                   <Link to="/api/appUsers/login" className='btn btn-primary pull-right mr20' >Session</Link>
                </ul>
              </div>
              <div className=" row text-center">
                  <h1> WELCOME ON STRONGLOOP REACT FOR USERS </h1>
              </div>
            </div>  
           ) 

  }


}