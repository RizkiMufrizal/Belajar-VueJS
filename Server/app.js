(function() {
  'use strict';

  var express = require('express'),
    expressSession = require('express-session'),
    path = require('path'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    cors = require('cors'),

    indexRoute = require('./routes/IndexRoute'),
    userRoute = require('./routes/UserRoute'),
    barangRoute = require('./routes/BarangRoute'),
    logger = require('./config/logger'),

    app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(cors());
  app.use(morgan('combined', {
    stream: logger.stream
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());
  app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRoute);
  app.use('/api', userRoute);
  app.user('/api', barangRoute);

  mongoose.connect('mongodb://localhost/Belajar-VueJS', function(err, res) {
    if (err) {
      return logger.error('koneksi mongodb gagal bung', err);
    } else {
      return logger.info('koneksi mongodb berhasil bung');
    }
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

  module.exports = app;

}).call(this);
