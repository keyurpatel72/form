var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: true });
require('../models/db');
const mongoose = require('mongoose');
const authModel = require("../models/auth");
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");


// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// let users = [
//   { id: 1, username: 'admin', password: '123456', email: 'admin@themesbrand.com' }
// ];

// // Mock GET request to /users when param `searchText` is 'John'
// mock.onGet("/users", { params: { searchText: "John" } }).reply(200, {
//   users: users,
// });

module.exports = function (app) {

  // Inner Auth
  app.get('/auth-login', function (req, res) {
    res.locals = { title: 'Login' };
    res.render('AuthInner/auth-login');
  });
  app.get('/auth-login-2', function (req, res) {
    res.locals = { title: 'Login 2' };
    res.render('AuthInner/auth-login-2');
  });
  app.get('/auth-register', function (req, res) {
    res.locals = { title: 'Register' };
    res.render('AuthInner/auth-register');
  });
  app.get('/auth-register-2', function (req, res) {
    res.locals = { title: 'Register 2' };
    res.render('AuthInner/auth-register-2');
  });
  app.get('/auth-recoverpw', function (req, res) {
    res.locals = { title: 'Recoverpw' };
    res.render('AuthInner/auth-recoverpw');
  });
  app.get('/auth-recoverpw-2', function (req, res) {
    res.locals = { title: 'Recoverpw 2' };
    res.render('AuthInner/auth-recoverpw-2');
  });
  app.get('/auth-lock-screen', function (req, res) {
    res.locals = { title: 'Lock Screen' };
    res.render('AuthInner/auth-lock-screen');
  });
  app.get('/auth-lock-screen-2', function (req, res) {
    res.locals = { title: 'Lock Screen 2' };
    res.render('AuthInner/auth-lock-screen-2');
  });
  app.get('/auth-confirm-mail', function (req, res) {
    res.locals = { title: 'Confirm Mail' };
    res.render('AuthInner/auth-confirm-mail');
  });
  app.get('/auth-confirm-mail-2', function (req, res) {
    res.locals = { title: 'Confirm Mail 2' };
    res.render('AuthInner/auth-confirm-mail-2');
  });
  app.get('/auth-email-verification', function (req, res) {
    res.locals = { title: 'Email verification' };
    res.render('AuthInner/auth-email-verification');
  });
  app.get('/auth-email-verification-2', function (req, res) {
    res.locals = { title: 'Email verification 2' };
    res.render('AuthInner/auth-email-verification-2');
  });
  app.get('/auth-two-step-verification', function (req, res) {
    res.locals = { title: 'Two step verification' };
    res.render('AuthInner/auth-two-step-verification');
  });
  app.get('/auth-two-step-verification-2', function (req, res) {
    res.locals = { title: 'Two step verification 2' };
    res.render('AuthInner/auth-two-step-verification-2');
  });

  // Crypto
  app.get('/crypto-ico-landing', function (req, res) {
    res.locals = { title: 'Crypto Ico Landing' };
    res.render('Crypto/crypto-ico-landing');
  });


  // Auth Pages

  app.get('/pages-maintenance', function (req, res) {
    res.locals = { title: 'Pages Maintenance' };
    res.render('Pages/pages-maintenance');
  });
  app.get('/pages-comingsoon', function (req, res) {
    res.locals = { title: 'Pages Comingsoon' };
    res.render('Pages/pages-comingsoon');
  });

  app.get('/pages-404', function (req, res) {
    res.locals = { title: 'Pages 404' };
    res.render('Pages/pages-404');
  });
  app.get('/pages-500', function (req, res) {
    res.locals = { title: 'Pages 500' };
    res.render('Pages/pages-500');
  });



  app.get('/register', function (req, res) {
    if (req.user) { res.redirect('Dashboard/index'); }
    else {
      res.render('Auth/auth-register', { 'message': req.flash('message'), 'error': req.flash('error') });
    }
  });

  app.post('/post-register', urlencodeParser, function (req, res) {
    
    var email =req.body.email;
		var username = req.body.username;
		var password = req.body.password;

		var data = {
			"email":email,
			"username":username,
			"password":password
      }
      var db=mongoose.connection;
db.collection('auths').insertOne(data,function(err, collection){
			if (err) throw err;
			console.log("Record inserted Successfully"); 
			if(collection){
				 res.redirect('/login'); 
			 }
		});
    //  let tempUser = { username: req.body.username, email: req.body.email, password: req.body.password };
    //  users.push(tempUser);

    // // Assign value in session
    // sess = req.session;
    // sess.user = tempUser;

    // res.redirect('/');
  });


  app.get('/login', function (req, res) {
    res.render('Auth/auth-login', { 'message': req.flash('message'), 'error': req.flash('error') });
  });

  // app.post('/post-login', urlencodeParser, function (req, res) {
  // 	//  Capture  fields
  //   var username = req.body.username;
  //   var password = req.body.password;
 
  //  if ( username && password) {
     
  //  AdminModel.findOne({ username : username , password: password }, function (err, user) {
  //           if(err){
  //        console.log('database error');
  //                        }
  //                        if(user){
  //              return res.redirect('/register');
  //                         }
  //                 })
       
  //  }else {
  //    res.send('Please enter Username and Password!');
  //    res.redirect('/login');
  //  }
  //   // const validUser = users.filter(usr => usr.email === req.body.email && usr.password === req.body.password);
  //   // if (validUser['length'] === 1) {

  //   //   // Assign value in session
  //   //   sess = req.session;
  //   //   sess.user = validUser;

  //   //   res.redirect('/');

  //   // } else {
  //   //   req.flash('error', 'Incorrect email or password!');
  //   //   res.redirect('/login');
  //   // }
  // });
  app.post('/post-login', function(request, response) {
    // // Capture  fields
     var username = request.body.username;
     var password = request.body.password;
  
    if (username && password) {
      
      authModel.findOne({ username: username, password: password }, function (err, user) {
             if(err){
          console.log('database error');
                          }
                          if(user){
                return response.redirect('/dashboard');
                           }
                   })
        
    }else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });
  app.get('/dashboard',  function (req, res) {
    res.locals = { title: 'Dashboard' };
    res.render('Dashboard/index');
});
  app.get('/forgot-password', function (req, res) {
    res.render('Auth/auth-forgot-password', { 'message': req.flash('message'), 'error': req.flash('error') });
  });

  app.post('/post-forgot-password', urlencodeParser, function (req, res) {
    const validUser = users.filter(usr => usr.email === req.body.email);
    if (validUser['length'] === 1) {
      req.flash('message', 'We have e-mailed your password reset link!');
      res.redirect('/forgot-password');
    } else {
      req.flash('error', 'Email Not Found !!');
      res.redirect('/forgot-password');
    }
  });

  app.get('/logout', function (req, res) {

    // Assign  null value in session
    sess = req.session;
    sess.user = null;

    res.redirect('/login');
  });


};