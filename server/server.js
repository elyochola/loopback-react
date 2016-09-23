var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.get('/api/alerts', function(req, res) {
  app.models.Alert.find( function (err, data) {
    res.json(data);
  });
});

app.post('/api/alerts', function(req, res) {
  app.models.Alert.create([{message: req.body.message, recipients: [req.body.recipients] } ])
});

app.delete('/api/alerts/:id', function(req, res) {
  var id = req.params.id
  app.models.Alert.remove({id: id}, function(err,data) {
    res.json({message: 'deleted'})
  })

});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
