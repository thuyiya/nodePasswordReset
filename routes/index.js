var express = require('express')
var controller = require('../controllers');

var routerr = express.Router();

routerr.route('/signup')
    .get(controller.showUsers)
    .post(controller.signup);

routerr.route('/forgot')
    .post(controller.forgot);

routerr.route('/forgot')
    .post(controller.forgot);

module.exports=routerr;