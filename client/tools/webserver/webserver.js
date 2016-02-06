var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var httpProxy = require('http-proxy');

var logger = require('morgan');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');

var _httpsOptions = {
    key: fs.readFileSync('../security/localhost.key'),
    cert: fs.readFileSync('../security/localhost.crt')
};

var app = express();
var proxy = new httpProxy.createProxyServer( { target: 'http://localhost:8080', secure: false } );

app.set( 'port', process.env.PORT || 8000 );
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../../src')));
//app.use(express.static(path.join(__dirname, '../../build/generated')));
//app.use(express.static(path.join(__dirname, '../../build/release')));

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.all("/*", function(req, res) {
      proxy.web(req, res, function(err) {
        console.log(err);
        //if (err) throw err;
      });
});

https.createServer( _httpsOptions , app ).listen(app.get( 'port' ), function( ) {
    console.log("Express server listening on port " + app.get('port') );
    fs.writeFile("node.pid", process.pid, function(err) {
        if(err) {
            console.log(err);
        }
    });
});
