import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Router, Route, Link , browserHistory} from 'react-router';
// import Login from './login'
// import Logout from './logout'
import {checkUserState} from '../actions/authentication'



class Navbar extends Component {

 constructor (props) {
    super(props)
     
  }


  componentWillMount() {
    this.props.dispatch(checkUserState())
  }
  
  render() {

    if (this.props == 'undefined') {
          
      var partial = 
                <ul>
                <Link to="/sign_up" className='btn btn-primary pull-right '   >Registration</Link>
                <Link to="/login" className='btn btn-primary pull-right mr20' >Session</Link>
                </ul>
    } else {
        var partial = 
                <ul>
                <Link to="/sign_up" className='btn btn-primary pull-right '   >Registration</Link>
                <Link to="/login" className='btn btn-primary pull-right mr20' >Session</Link>
                </ul>

    }            

    
    return (
      <nav className='navbar'>
            {partial}
     </nav>
    )
  }

}

export default connect()(Navbar);


