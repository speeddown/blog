var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boottestRouter = require('./routes/boottest');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'layout.hbs',
  partialsDir: __dirname + '/views/partials',
  helpers: {
    test: () => {return 'Tested Helper!'},
    multi: (arg1, arg2) => {
      let resultPart1;
      if (arg1 === 'Test1'){
        resultPart1 = 'Correct';
      } else {
        resultPart1 = 'Incorrect';
      }

      let resultPart2;
      if (arg2  === 'Test2') {
        resultPart2 = 'Correct';
      } else {
        resultPart2 = 'Incorrect';
      }

      return "<div><p>" + resultPart1 + " " + resultPart2 + "</p></div>";
    }
  }
});

// view engine setup
app.engine('hbs', hbs.engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boottest', boottestRouter);

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
