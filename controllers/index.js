var userModel = require('../models');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var showUsers = function(req, res){
    userModel.find(function(err, users){
        if (err) {
            res.status(500);
            res.send('internal error');
        }else {
            res.status(200);
            res.send(users);
        }
    });
};

var signup = function(req, res){
    var user = new userModel(req.body);
    user.save(function(err, result){
        if (err) {
            res.status(500);
            res.send("failed to added user to database");
        } else {
            res.status(201);
            res.send(result);
        }
    })
};

var forgot= function(req, res, next){
      async.waterfall([
        function(done) {
        crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
        });
        },
        function(token, done) {
        userModel.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
            // res.write('No account with that email address exists.');
            return res.send('No account with that email address exists.');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
            done(err, token, user);
            });
        });
        },
        function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: "mail",
            pass: "pass" 
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'thuyiya@zoom.lk',
            subject: 'Password Reset',
            html: '<h4>Hi Mcn,</h4><p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</p>' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            '<a href="http://' + req.headers.host + '/reset/' + token + '">Reset Your Password</a>\n\n' +
            '<p>If you did not request this, please ignore this email and your password will remain unchanged.\n</p>'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            // res.write('An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
        });
        }
    ], function(err) {
        if (err) return next(err);
        res.send('e-mail has been sent');
    });
};

var token = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          // res.send('Password reset token is invalid or has expired.');
          return res.send('Password reset token is invalid or has expired.'); //res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        // res.send('Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.send('Success! Your password has been changed.');
  });
}

module.exports = {
    signup: signup,
    showUsers : showUsers,
    forgot: forgot,
    token: token
};