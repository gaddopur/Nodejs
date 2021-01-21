var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishesRouter');
var leadersRouter = require('./routes/leadersRouter');
var promoRouter = require('./routes/promotionsRouter');
var uploadRouter = require('./routes/uploadRouter');

const url = "mongodb://localhost:27017/Confusion";
const connect = mongoose.connect(url);

connect.then(db => {
  console.log('We connected succesfully to the mongodb server');
}, err => console.log('We found an error what do next',err));

var app = express();

var coreOptions = {
  origin: 'null',
}
app.use(cors(coreOptions));

app.all('*', (req, res, next) => {
  if(req.secure) return next();
  res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('67890-09876-54321'));

app.use(session({
  name:'session-id',
  secret:'40983104280980931411',
  saveUnintialized: false,
  resave: false,
  store: new fileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req, res, next) {
  console.log(req.session);
  if(!req.session.user) {
    var err = new Error("You are not authenticated pls first login then try excess somethings");
    err.status = 403;
    next(err);
  }
  else {
    next();
  }  
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/imageupload', uploadRouter);
app.use('/dishes', dishesRouter);
app.use('/leaders', leadersRouter);
app.use('/promoes', promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


// if(!req.session.user) {
//   var authHeader = req.headers.authorization;
//   if(!authHeader) {
//     var err = new Error('You are not authenticated! Can you help us in helping you');
//     err.status = 401;
//     res.setHeader('WWW-Authenticate', 'Basic');
//     next(err);
//     return;
//   }
//   const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//   const user = auth[0];
//   const password = auth[1];

//   console.log("you can watch user id and password here", user, password);

//   if(user == "admin" && password == 'password') {
//     req.session.user = 'admin';
//     next();
//   }
//   else {
//     var err = new Error('You are not authenticated! Can you help us in helping you');
//     err.status = 401;
//     res.setHeader('WWW-Authenticate', 'Basic');
//     next(err);
//   }
// }