var express = require('express')
  , http = require('http')
  , connect = require('connect');

var staticServer = connect()
  .use(connect.static('public'))
  .use(connect.directory('public'))
  .use(connect.cookieParser());
 
var app = express();

app.configure(function() {
  app.use(staticServer);
  app.use(express.errorHandler());
  app.use(express.bodyParser());
});

var server = http.createServer(app);

server.listen(8080);


