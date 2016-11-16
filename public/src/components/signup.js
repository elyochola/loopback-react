import {connect} from 'react-redux'
import React, { Component, PropTypes } from 'react'
import {signUpUser} from '../actions/authentication'
// https://github.com/sotojuan/saga-login-flow/blob/master/app/components/Login.js
class SignUp extends Component {

  constructor (props, context) {
    super(props)
  }
  
  render() {
    const { errorMessage } = this.props
    
    return (
      <div className="text-center col-sm-6 col-sm-offset-3 white-bg" >
        <h2> Sign up </h2>
        <div className="form-group">   
          <input type='text' ref='firstName' className="form-control" style={{ marginRight: '5px' }} placeholder='firname'/>
        </div>
        <div className="form-group">   
          <input type='text' ref='lastName' className="form-control" style={{ marginRight: '5px' }} placeholder='lastname'/>
        </div>
        <div className="form-group">   
          <input type='text' ref='email' className="form-control" style={{ marginRight: '5px' }} placeholder='email'/>
        </div>
        <div className="form-group">   
          <input type='password' ref='password' className="form-control" style={{ marginRight: '5px' }} placeholder='Password'/>
        </div>
        <div className="form-group">   
          <button onClick={(event) => this.handleClick(event)} className="btn btn-success">
            Sign up
          </button>
        </div>
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }


  
  handleClick(event) {
    event.preventDefault()
    const lastName  = this.refs.lastName
    const firstName = this.refs.firstName
    const email     = this.refs.email
    const password  = this.refs.password
    const creds     = { email: email.value.trim(), 
                        password: password.value.trim(),
                        lastName: lastName.value.trim(),
                        firstName: firstName.value.trim()
                      }
    this.onSignUpClick(creds)
  }

  onSignUpClick(creds) {
    localStorage.clear()
    console.log(this.props)
    this.props.dispatch(signUpUser(creds)).then(
         () => {
                if (this.props.state.auth.isAuthenticated == true) {
                  this.props.history.push('/profil')
                }  
          
    }); 
  }



}




export default connect(state => ({ state: state }))(SignUp)







// }