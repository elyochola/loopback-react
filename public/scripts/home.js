// Begin AlertModal
  var AlertModal = React.createClass({

    getInitialState: function() {
      return {modal: "modal fade", 
              message: this.props.alert.message, 
              recipients: this.props.alert.recipients,
              alertId: this.props.alert.id, 
            };
    },

    openModal: function() {
       this.setState({modal: "modal show"});
    },

    closeModal: function() {
      this.setState({modal: "modal hide"});  
    },

    handleMessageChange: function(e) {
      this.setState({message: e.target.value});
    },

    handleRecipientsChange: function(e) {
      this.setState({recipients: e.target.value});
    },
    
    
    render: function() {
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
                <form className="col-sm-12 text-center" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input 
                      name="message" 
                      type="text" 
                      value={this.state.message}
                      onChange={this.handleMessageChange} />
                  </div> 
                  <div className="form-group">
                    <input 
                      name="recipients" 
                      type="text" 
                      value={this.state.recipients} 
                      onChange={this.handleRecipientsChange} />
                  </div> 
                </form>  
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  })



// Ending AlertModal






// Begin Alert 
var Alert = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },


  handleDelete: function () {
    $.ajax({
      url: 'api/alerts/' + this.props.id.toString(),
      dataType: 'json',
      type: 'DELETE',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    }); 
  },

  handleEdit: function() {
    this.refs.alertModal.openModal()
  },


  render: function() {
    return (
      <div className="comment col-sm-4">
        <AlertModal alert={this.props} ref="alertModal"/>
        <p className="alertMessage">
          message : {this.props.message}
          <a className="" onClick={this.handleEdit}>edit</a>
          <a className="pull-right" onClick={this.handleDelete}>delete</a>
        </p>
          recipients : {this.props.recipients}
      </div>
    );
  }
});


// EndAlert

 // Begin AlertBox
var AlertBox = React.createClass({
  loadAlertsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleAlertSubmit: function(alert) {
    var alerts = this.state.data;
    var newalerts = alerts.concat([alert]);
    this.setState({data: newalerts});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: alert,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: alerts});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

 

  getInitialState: function() {

    return {data: []};
  },
  componentDidMount: function() {
    this.loadAlertsFromServer();
    setInterval(this.loadAlertsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="alertBox">
        <h1>Alerts</h1>
        <AlertList data={this.state.data} />
        <AlertForm onAlertSubmit={this.handleAlertSubmit} />
      </div>
    );
  }
});
 // End AlertBox

// Begining AlertList
var AlertList = React.createClass({

  render: function() {
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
});

// End AlertList

// Beginning AlertForm
var AlertForm = React.createClass({
  getInitialState: function() {
    return {message: '', recipients: ''};
  },
  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },
  handleRecipientsChange: function(e) {
    this.setState({recipients: e.target.value});
  },
  handleSubmit: function(e) {

    e.preventDefault();
    var message = this.state.message.trim();
    var recipients = this.state.recipients.trim();
    if (!message || !recipients) {
      return;
    }
    this.props.onAlertSubmit({message: message, recipients: recipients});
    this.setState({message: '', recipients: ''});
  },
  render: function() {
    return (

      <form className="commentForm col-sm-12 text-center" onSubmit={this.handleSubmit}>
        <h3>Alert creation</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={this.handleMessageChange}
          />
        </div> 
        <div className="form-group">   
          <input
            type="text"
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
});

// Ending AlertFrom

// ReacDOM.render which render view inside a div 

ReactDOM.render(
  <AlertBox url="api/alerts" pollInterval={2000} />,
  document.getElementById('content')
);
