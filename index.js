var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
var path = require('path');
var mongoose = require ('mongoose');
var http = require('http').Server(app);


// mongoose.connect(`mongodb://localhost:27017/skotedb`, {
//     useNewUrlParser: true,
   
  
// }).then(() => {
//     console.log('MongoDB connected!!');
// }).catch(err => {
//     console.log('Failed to connect to MongoDB', err);
// });

//campass path
//var mongoDB = 'mongodb:/localhost:27017/skote';
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//mongoose connection
//var db= mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log(" connection successfully");

//.then(()=>console.log(" connection successfully"))
//.catch((err)=>console.log(err));

exports.test = function(req,res) {
  res.render('skote');
};


// import controller
var AuthController = require('./controllers/AuthController');

// import Router file
var pageRouter = require('./routers/route');

var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var i18n = require("i18n-express");
app.use(bodyParser.json());
var urlencodeParser = bodyParser.urlencoded({ extended: true });

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1200000
  }
}));

app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(flash());
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["es", "en", "de", "ru", "it"],
  textsVarName: 'translation'
}));

app.use('/public', express.static('public'));

app.get('/layouts/', function (req, res) {
  res.render('view');
});

// apply controller
AuthController(app);

//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
const { error } = require('console');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Define All Route 
pageRouter(app);

app.all('*', function (req, res) {
  res.locals = { title: 'Error 404' };
  res.render('pages/pages-404', { layout: false });
});

http.listen(8000, function () {
  console.log('listening on *:8000');
});
