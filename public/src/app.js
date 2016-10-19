import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import {Router, Route, Link , browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {RegistrationsForm} from './registrations';
import {SessionsForm} from './sessions';
import MainSection from './components/mainSection'
import * as TodoActions from './actions'




const App = ({todos, actions}) => (
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


const mapStateToProps = (state) => {
   return {

   }
};
const mapDispatchToProps = (dispatch) => {
   return {

   }
};

export default connect(mapStateToProps)(App);


