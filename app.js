var express=require("express");
var bodyParser=require("body-parser");
var  path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0. 0.1.:27017/formdb');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var Username = req.body.Username;	
	var pass = req.body.password;
	

	var data = {
		"Username": Username,
		"password": password
		
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('login.html');
}).listen(3000)


console.log("server listening at port 3000");
