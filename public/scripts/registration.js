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
                      placeholder="Message"
                      size="200"
                      className="form-control"
                      // value={this.state.message}
                      // onChange={this.handleMessageChange}
                    />
                  </div> 
                  <div className="form-group">   
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Recipients"
                      // value={this.state.recipients}
                      // onChange={this.handleRecipientsChange}
                    />
                  </div> 
                  <div className="form-group">  
                    <input type="submit" value="Submit" className="btn btn-success" />
                  </div>   
              </form>
        );
    }










}