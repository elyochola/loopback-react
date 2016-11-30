var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var loopback = require('loopback');
var boot = require('loopback-boot');
var webpack = require('webpack');
var config = require('../webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var compiler = webpack(config);

var app = module.exports = loopback();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// webpack config

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler));



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



// your web server will get a request to /accounts/23. You will need it to handle that URL and include your JavaScript application in the response.
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
})


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
