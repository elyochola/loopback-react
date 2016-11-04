import React, {Component, PropTypes} from 'react';
import {Router, Route, Link , browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Profil from './components/profil';
import Login from './components/login';
import SignUp from './components/signUp';
import App from './app';
// import { loginUser, logoutUser } from './actions/index'


export class Routes extends Component {

  render () {
    return (
            <Router history={browserHistory}>
              <Route path="/" component={App}/>
              <Route path="/sign_up"   component={SignUp} url="/sign_up"  />
              <Route path="/login"     component={Login} url="/login"   />
              <Route path="/profil"    component={Profil} url="/profil"   />
            </Router>
           ) 

    }


}


