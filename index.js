const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');
const UserModel = require("./models/user")



const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formdb');//.then(console.log).catch(console.error)
//mongoose.connect("mongodb://"+process.env.MONGO_SERVER)




 
	


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




app.post('/login_pros', function(request, response) {
	// // Capture the input fields
	// let username = request.body.username;
	// let password = request.body.password;
	let username = request.query.username;
	let password = request.query.password;
	
	if (username && password) {
	UserModel.findOne({ username: username, password: password }, function (err, user) {
	         if(err){
                               res.send("Database error")
                        }
                        if(user){
                            console.log(user)
                            res.redirect("/dashboard")
                         }
                 })
	} 
		
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
