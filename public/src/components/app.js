import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import {Navbar} from './navbar';
import {MainSection} from './mainSection'


class App extends Component {
  
  render() {
    
    return (
          <div>
             <Navbar/> 
             {this.props.children}
          </div> 
    )
  }
}




export default connect()(App);
