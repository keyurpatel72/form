
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/skote_pro');

var db=mongoose.connection;
console.log("connection checking");
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
});
require('./user');