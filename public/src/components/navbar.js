import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Router, Route, Link , browserHistory} from 'react-router';
import {checkUserState, logoutUser} from '../actions/authentication'



class Navbar extends Component {

 constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }



  logout() {
    this.props.dispatch(logoutUser())
    console.log(this)
    // TO_DO
    this.props.history.push('/home')
  }

  
  render() {

    if (this.props.state.auth.isAuthenticated == true) {
       var partial = 
          <ul>
          <div onClick={this.logout} className='btn btn-primary pull-right '   >Logout</div>
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


const mapStateToProps = (state) => {
  return {
    state
  }
};

export default connect(mapStateToProps)(Navbar);


