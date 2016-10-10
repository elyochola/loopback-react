import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';


export class AlertModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
        modal: "modal fade", 
        message: this.props.alert.message, 
        recipients: this.props.alert.recipients,
        alertId: this.props.alert.id, 
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  openModal() {
    this.setState({modal: "modal show"});
  }

  closeModal() {
    this.setState({modal: "modal hide"}); 
  }

  handleMessageChange(e) {
    this.setState({message: e.target.value});
  }

  handleRecipientsChange(e) {
    this.setState({recipients: e.target.value});
  }

  handleSubmit(e) {
      e.preventDefault();
      var alert = {message: this.state.message, recipients: [this.state.recipients], id: this.state.alertId};
      $.ajax({
        url: 'api/alerts/' + this.state.alertId.toString(),
        dataType: 'json',
        type: 'PATCH',
        data: alert,
        success: function() {
          console.log(this)
          this.setState({data: this.state.data});

        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({data: this.state.data});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    


    render() {
        return (
        <div className={this.state.modal} id={this.props.alertId}>
            <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Alerte {this.state.alertId}</h4>
              </div>
              <div className="modal-body">
                <form className="text-center" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input 
                      name="message" 
                      type="text" 
                      className="form-control"
                      size="200"
                      value={this.state.message}
                      onChange={this.handleMessageChange} />
                  </div> 
                  <div className="form-group">
                    <input 
                      name="recipients" 
                      type="text" 
                      className="form-control"
                      value={this.state.recipients} 
                      onChange={this.handleRecipientsChange} />
                  </div> 
                   <div className="modal-footer">
                    <input type="submit" value="Submit" className="btn btn-success" />
                  </div>
                </form>  
              </div>
            </div>
          </div>
        </div>
        );
    }
}





// Ending AlertModal
// Beginning Alert
export  class Alert extends Component {

  constructor(props){
    super(props);
    this.rawMarkup     = this.rawMarkup.bind(this);
    this.handleDelete  = this.handleDelete.bind(this);
    this.handleEdit    = this.handleEdit.bind(this);
  }

  rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }

  loadAlertsFromServer() {
    console.log(this.props);
    console.log('coucou');
  }

  handleDelete() {
    $.ajax({
      url: 'api/alerts/' + this.props.id.toString(),
      dataType: 'json',
      type: 'DELETE',
      cache: false,
      success: function(data) {
        this.loadAlertsFromServer;
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    }); 
  }

  handleEdit() {
    this.refs.alertModal.openModal()
  }

  render() {
    return (
      <div className="comment col-sm-4">
        <AlertModal alert={this.props} ref="alertModal"/>
        <h4 className="alertMessage">
          message : {this.props.message}
          <a className="btn-warning pull-right btn" onClick={this.handleEdit}>edit</a>
          <a className="pull-right btn btn-danger" onClick={this.handleDelete}>delete</a>
        </h4>
          recipients : {this.props.recipients}
      </div>
    );

  }


}

// EndAlert
// Begining AlertBox
export class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []} ;
    this.loadAlertsFromServer = this.loadAlertsFromServer.bind(this);
    this.handleAlertSubmit    = this.handleAlertSubmit.bind(this);
    this.componentDidMount    = this.componentDidMount.bind(this);
  }

  loadAlertsFromServer() {
    $.ajax({
      url: this.props.route.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleAlertSubmit(alert) {
    var alerts = this.state.data;
    var newalerts = alerts.concat([alert]);
    this.setState({data: newalerts});
    $.ajax({
      url: this.props.route.url,
      dataType: 'json',
      type: 'POST',
      data: alert,
      success: function(data) {
        this.loadAlertsFromServer;
      },
      error: function(xhr, status, err) {
        this.setState({data: alerts});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }



  componentDidMount() {
    this.loadAlertsFromServer();
    setInterval(this.loadAlertsFromServer, this.props.route.pollInterval);
  }

  render() {
    return (
      <div className="alertBox content">
        <h1>Alerts</h1>
        <div className="col-sm-9">
          <AlertList data={this.state.data} />
        </div>  
        <div className="col-sm-3">
          <AlertForm onAlertSubmit={this.handleAlertSubmit} />
        </div>
      </div>
    );
  }

}


export class AlertList extends Component {
  constructor(props){
    super(props);
  }

  render() {
     var alertNodes = this.props.data.map(function(alert) {
      return (
        <Alert message={alert.message} recipients={alert.recipients} id={alert.id}>
        </Alert>
      );
    });
    return (
      <div className="alertList">
        {alertNodes}
      </div>
    );
  }

}
// End AlertList

// Beginning AlertForm
export class AlertForm extends Component {
  constructor(props) {
    super(props);
    this.state                  = {message: '', recipients: ''}
    this.handleMessageChange    = this.handleMessageChange.bind(this);
    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);
    this.handleSubmit           = this.handleSubmit.bind(this);
  }

  handleMessageChange(e) {
    this.setState({message: e.target.value});
  }

  handleRecipientsChange(e) {
    this.setState({recipients: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var message = this.state.message.trim();
    var recipients = this.state.recipients.trim();
    if (!message || !recipients) {
      return;
    }
    this.props.onAlertSubmit({message: message, recipients: recipients});
    this.setState({message: '', recipients: ''});
  }

  render() {
    return (
          <form className="text-center col-sm-12" onSubmit={this.handleSubmit}>
            <h3>Alert creation</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Message"
                size="200"
                className="form-control"
                value={this.state.message}
                onChange={this.handleMessageChange}
              />
            </div> 
            <div className="form-group">   
              <input
                type="text"
                className="form-control"
                placeholder="Recipients"
                value={this.state.recipients}
                onChange={this.handleRecipientsChange}
              />
            </div> 
            <div className="form-group">  
              <input type="submit" value="Submit" className="btn btn-success" />
            </div>   
          </form>
    );
  }
}


// Ending AlertFrom

// ReacDOM.render which render view inside a div 


