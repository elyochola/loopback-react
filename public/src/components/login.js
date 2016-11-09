import {connect} from 'react-redux'
import React, { Component, PropTypes } from 'react'
import {loginUser} from '../actions/authentication'
// https://github.com/sotojuan/saga-login-flow/blob/master/app/components/Login.js
class Login extends Component {

  constructor (props) {
    super(props)

    this.onLoginClick = this.onLoginClick.bind(this)
  }
  
  render() {
    const { errorMessage } = this.props
    
    return (
      <div className="text-center col-sm-6 col-sm-offset-3 white-bg" >
        <h2> Sign in </h2>
        <div className="form-group">   
          <input type='text' ref='username'  className="form-control" style={{ marginRight: '5px' }} placeholder='Username'/>
        </div>
        <div className="form-group">   
          <input type='password' ref='password' className="form-control" style={{ marginRight: '5px' }} placeholder='Password'/>
        </div>
        <div className="form-group">   
          <button onClick={(event) => this.handleClick(event)} className="btn btn-success">
            Login
          </button>
        </div>
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }


  
  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.onLoginClick(creds)
  }

  onLoginClick(creds) {
    this.props.dispatch(loginUser(creds)).then(
         () => {
                if (this.props.state.auth.isAuthenticated == true) {
                  this.props.history.push('/profil')
                }  
          
    });   
  }



}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}


export default connect(state => ({ state: state }))(Login)






