var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

      function isUserAllowed(req, res, next) {
            sess = req.session;
            if (sess.user) {
                  return next();
            }
            else { res.redirect('/login'); }
      }

      app.get('/dashboard-blog', isUserAllowed, function (req, res) {
            res.locals = { title: 'Blog Dashboard' };
            res.render('Dashboard/dashboard-blog');
      });

      app.get('/dashboard-saas', isUserAllowed, function (req, res) {
            res.locals = { title: 'Saas Dashboard' };
            res.render('Dashboard/dashboard-saas');
      });

      app.get('/dashboard-crypto', isUserAllowed, function (req, res) {
            res.locals = { title: 'Crypto Dashboard' };
            res.render('Dashboard/dashboard-crypto');
      });

      app.get('/', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dashboard' };
            res.render('Dashboard/index');
      });

        //manage
       app.get('/adduser', isUserAllowed, function (req, res) {
             res.locals = { title: 'Add User' };
             res.render('Manage/adduser');
       });
      //  add user form data insert
       app.post('/insert_user',function(request,response){
            //send data
                  var name = request.body.name;
                  var email =request.body.email;
                  var password = request.body.password;
                  var role= request.body.role;
                  var Account = request.body.Account;
      
                  var data = {
                        "name":name,
                        "email":email,
                        "password":password,
                        "role":role,
                        "Account":Account
                  }
            db.collection('users').insertOne(data,function(err, collection){
                        if (err) throw err;
                        console.log("Record inserted Successfully"); 
                        if(collection){
                              return response.redirect('/'); // redirect login page
                         }
                  });
      });
       app.get('/addaccount', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Account' };
            res.render('Manage/addaccount');
            });
          //  add account form data insert
       app.post('/insert_account',function(request,response){
            //send data
                  var ac_name = request.body.ac_name;
                  var ac_owner_name =request.body.ac_owner_name;
                  var ac_address1 = request.body.ac_address1;
                  var ac_address2= request.body.ac_address2;
                  var ac_Country = request.body.ac_Country;
                  var ac_State =request.body.ac_State;
                  var ac_city =request.body.ac_city;
                  var zip=request.body.zip;
                  var email = request.body.email;
                  var phn_num =request.body.phn_num;
                  var time = request.body.time;
                  var billing_dc_name = request.body.billing_dc_name;
                  var billing_dc_number =request.body.billing_dc_number;
                  var billing_dc_email =request.body.billing_dc_email;
                  var ac_city=request.body.ac_city

                  var data = {
                        "ac_name":ac_name,
                        "ac_owner_name":ac_owner_name,
                        "ac_address1 ":ac_address1 ,
                        "ac_address2":ac_address2,
                        "ac_Country":ac_Country,
                        "ac_State":ac_State,
                        "ac_city":ac_city,
                        "zip":zip,
                        "email":email,
                        "phn_num":phn_num,
                        "time":time,
                        "billing_dc_name":billing_dc_name,
                        "billing_dc_number":billing_dc_number,
                        "billing_dc_email":billing_dc_email,
                        "ac_city":ac_city
                  }
            db.collection('users').insertOne(data,function(err, collection){
                        if (err) throw err;
                        console.log("Record inserted Successfully"); 
                        if(collection){
                              return response.redirect('/'); // redirect login page
                         }
                  });
      });  
      //Parking Rates
      app.get('/ParkingRate', isUserAllowed, function (req, res) {
            res.locals = { title: 'ParkingRates ' };
            res.render('ParkingRates/parkingrate');
      });  

      //Blocked vehicles
      app.get('/blockedvehicle',isUserAllowed,function(req,res){
            res.locals ={title: 'Blocked vehicles'};
            res.render('blockedvehicle/blockedvehicle');
      })
      //cameras
      app.get('/camera',isUserAllowed,function(req,res){
            res.locals = {title : 'Cameras'};
            res.render('cameras/camera');
      })
      //settings
      app.get('/setting',isUserAllowed,function(req,res){
            res.locals = {title:'settings'};
            res.render ('settings/setting');
      })


   
}
