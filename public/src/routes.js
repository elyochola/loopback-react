import React, {Component, PropTypes} from 'react';
import {IndexRoute, Router, Route, Link , browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Profil from './components/profil';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import App from './components/app';


// import { loginUser, logoutUser } from './actions/index'


export class Routes extends Component {


  render () {

    return (
            <Router history={browserHistory}>
              <Route path="/" component={App} >
                <IndexRoute component={Home}/>
                <Route path="/sign_up"   component={SignUp} url="/sign_up"  />
                <Route path="/login"     component={Login} url="/login"   />
                <Route path="/profil"    component={Profil}   />
              </Route>
            </Router>
           ) 

    }


}


