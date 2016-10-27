import React, { Component, PropTypes } from 'react'
import {Router, Route, Link , browserHistory} from 'react-router';
import Login from './login'
import Logout from './logout'


// export class Navbar extends Component {
  
//   render() {
//     const { dispatch, isAuthenticated, errorMessage } = this.props
//     return (
//       <nav className='navbar navbar-default'>
//         <div className='container-fluid'>
//           <a className="navbar-brand" href="#">Quotes App</a>
//            <div className='navbar-form'>
           
//            {!isAuthenticated &&
//              <Login
//                errorMessage={errorMessage}
//                onLoginClick={ creds => dispatch(loginUser(creds)) }
//              />
//            }
           
//            {isAuthenticated &&
//              <Logout onLogoutClick={() => dispatch(logoutUser())} />
//            }
         
//          </div>
//        </div>
//      </nav>
//     )
//   }

// }



export class Navbar extends Component {
  
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <ul>
            <Link to="/api/appUsers" className='btn btn-primary pull-right '   >Registration</Link>
            <Link to="/api/appUsers/login" className='btn btn-primary pull-right mr20' >Session</Link>
          </ul>
       </div>
     </nav>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string

  }