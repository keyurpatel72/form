const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');
const UserModel = require("./models/user")

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'formdb';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();

// });


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formdb');
var db=mongoose.connection;




//db.on('error', console.log.bind(console, "connection error"));
db.on('error',console.error.bind(console,"connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

        
module.exports={
     createData:function(inputData, callback){
                  
        userData= new UserModel(inputData);
        userData.save(function(err, data){
          if (err) throw err;
           return callback(data);
        });
	}
}
	


const app = express();
const port = 2300
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

// app.post('/login_pros', function(request, response) {
	
// 	let username = request.body.username;
// 	let password = request.body.password;

// 	if (username && password) {
	
//         connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?',
//          [username, password], function(error, results, fields) {
		
// 			if (error) throw error;
			
// 			if (results.length > 0) {
				
// 				request.session.loggedin = true;
// 				request.session.username = username;
			
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect !');
// 			}			
// 			response.end();



// 		});
// 	} else {
// 		response.send('Please enter Username & Password!');
// 		response.end();
// 	}
// });
app.post('/login_pros', function(request, response) {
	// // Capture the input fields
	// let username = request.body.username;
	// let password = request.body.password;
	let username = request.query.username;
	let password = request.query.password;
	
	if (username && password) {
	
	
			if (error) throw error;
			
			if (results.length > 0) {
			
				request.session.loggedin = true;
				request.session.username = username;
		
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



app.get('/home', function(request, response) {
	//  user  login
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  });