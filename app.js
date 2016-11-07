var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var routerr = require('./routes');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'session secret key' }));

var port = process.env.PORT || 3000;
//set PORT= 8080
app.listen(port, function () {
    console.log('ready on port', port);
});
//routers
app.use('/', routerr);

//Api endPoints
/* see database users 
GET - http://localhost:3000/signup
POST - send username, password, email

POST - http://localhost:3000/forgot
 */