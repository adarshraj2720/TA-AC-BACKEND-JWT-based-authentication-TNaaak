var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var v1Router = require('./routes/version1');
var v2Router = require('./routes/version2');
// var commentRouter = require('./routes/comment');


var app = express();

//db connect

mongoose.connect('mongodb://127.0.0.1:27017/sampleapi',(err)=>{
  console.log(err ? err : "connected ")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/v1/version1',v1Router);
app.use('/api/v2/version2',v2Router);
// app.use('/api/v2/comment',commentRouter);

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
