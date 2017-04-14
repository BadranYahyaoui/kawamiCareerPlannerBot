// Dear Grpoup Members do change the order of require plz plz plz

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var session= require('express-session');
var configDB = require('./config/database.js');
var app = express();
app.use(cors());
var morgan = require('morgan');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

// view engine setup

app.use(morgan('dev'));
//app.use(logger('dev'));
app.use(bodyParser.json());

app.use( bodyParser.urlencoded({ extended: true }) );  //Dear Group member Do not touch this ,Contact Badran t Edit
app.set('view engine', 'ejs'); // set up ejs for templatingpp.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

var userlist=require('./routes/userList');
app.use('/userlist',userlist);
app.use('/', users);
app.use(session({
    secret: 'ilovesbadranbadranbadranbadran', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./routes/index')(app, passport);

app.set('views', path.join(__dirname, 'views'));

//app.use(express.static(path.join(__dirname + '.../public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
