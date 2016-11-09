import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {getProfil} from '../actions/profilManagement'


export class Profil extends Component {
 
  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)

  }


 componentWillMount() {
 	let token  = localStorage.getItem('token')
 	let userId = localStorage.getItem('userId')
 	this.props.dispatch(getProfil(token, userId)).then(
    () => { 
      console.log('coucou')
      console.log(this.props)
    }
  )
 }

    render() {
        return (
            <div className=" row text-center">
              <h1> Vous êtes connecté en tant que {this.props.state.profil.user.email} </h1>
            </div>

        );
    }


}

export default connect(state => ({ state: state }))(Profil)