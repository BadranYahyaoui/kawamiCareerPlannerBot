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
var Tag = require('./models/tag');
var Quiz = require('./models/quiz');
var db = require('./models/university');
require('./config/passport')(passport);


// view engine setup

app.use(morgan('dev'));
//app.use(logger('dev'));
app.use(bodyParser.json());

app.use( bodyParser.urlencoded({ extended: true }) );
app.set('view engine', 'ejs'); // set up ejs for templatingpp.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
var seoVerifier=require('./routes/seoVerifier');
var seoFixer=require('./routes/seoFixer');

var tagRouter = require('./routes/tags')(Tag);
var quizRouter = require('./routes/quizzes')(Quiz);
var universities = require('./routes/universities');
var vocationalTraining=require('./routes/vocationalTraining');

app.use('/api/tags', tagRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/universities', universities);
app.use('/api/vocationals',vocationalTraining);

var userlist=require('./routes/userList');
app.use('/userlist',userlist);
app.use('/', users);
app.use('/seostatus',seoVerifier);
app.use('/seofixer',seoFixer);
app.use(session({
    secret: 'badlkqjshdqjkshgd', // session secret
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
