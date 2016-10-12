import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';


export class RegistrationForm extends Component {


    render() {
        return (
              <form className="text-center col-sm-12" >
                  <h3>Registration</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Password"
                      className="form-control"
         
                    />
                  </div> 
                  <div className="form-group">   
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"

                    />
                  </div> 
                  <div className="form-group">  
                    <input type="submit" value="Submit" className="btn btn-success" />
                  </div>   
              </form>
        );
    }










}