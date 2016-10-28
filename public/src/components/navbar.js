import React, { Component, PropTypes } from 'react'
import {Router, Route, Link , browserHistory} from 'react-router';
import Login from './login'
import Logout from './logout'


// }



export class Navbar extends Component {
  
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <nav className='navbar'>
          <ul>
            <Link to="/sign_up" className='btn btn-primary pull-right '   >Registration</Link>
            <Link to="/login" className='btn btn-primary pull-right mr20' >Session</Link>
          </ul>
     </nav>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string

  }