import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Navbar} from './navbar';
import {MainSection} from './mainSection'

// https://github.com/auth0-blog/redux-auth/blob/master/reducers.js

class Home extends Component {
  
  render() {
   
    
    return (
          <div>
            <MainSection/> 
          </div> 
    )
  }
}




export default connect()(Home);
