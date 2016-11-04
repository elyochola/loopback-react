import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Navbar} from './components/navbar';
import {MainSection} from './components/mainSection'

// https://github.com/auth0-blog/redux-auth/blob/master/reducers.js

class App extends Component {
  
  render() {
    const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote } = this.props
    return (
          <div>
             <Navbar isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch}/> 
             <MainSection/>
          </div> 
    )
  }
}


const mapStateToProps = (state) => {
   return {
     
   }
};
const mapDispatchToProps = (dispatch) => {
  const { isAuthenticated, errorMessage } = auth
  
  return {
    isAuthenticated,
    errorMessage
  }
};

export default connect(mapStateToProps)(App);


            // <div className="row">
            //   <ul>
            //      <Link to="/api/appUsers" className='btn btn-primary pull-right '  >Registration</Link>
            //      <Link to="/api/appUsers/login" className='btn btn-primary pull-right mr20' >Session</Link>
            //   </ul>
            // </div>