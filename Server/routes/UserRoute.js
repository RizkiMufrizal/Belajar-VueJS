(function() {
  'use strict';

  var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    logger = require('../config/logger'),
    jsonwebtoken = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    uuid = require('node-uuid'),
    User = require('../models/User'),
    secret = 'ini adalah kata kunci 12345';

  router.post('/user', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          logger.error('error bung ', err);
          return res.json(err);
        }

        var user = new User({
          email: email,
          passwordHash: hash,
          passwordSalt: salt,
          enable: true
        });

        user.save(function(err, user) {
          if (err) {
            logger.error('error bung ', err);
            res.json(err);
          }

          res.json({
            'info': 'anda berhasil melakukan registrasi',
            'success': true
          });

        });
      });
    });

  });

  router.post('/authenticate', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
      email: email
    }, function(err, user) {

      if (err) {
        logger.error('error bung ', err);
        res.json(err);
      }

      if (user.length) {
        bcrypt.compare(password, user.passwordHash, function(err, u) {
          if (u) {

            var profile = {
              email: user.email,
              enable: user.enable,
              id: uuid.v4()
            };

            jsonwebtoken.sign(profile, secret, {
              expiresInMinutes: 60 * 5
            }, function(err, token) {

              if (err) {
                logger.error('error bung ', err);
                res.json(err);
              }

              res.json({
                'info': 'anda berhasil login',
                'token': token,
                'success': true
              });

            });
          } else {
            res.json({
              'info': 'password anda salah',
              'success': false
            });
          }
        });
      } else {
        res.json({
          'info': 'anda belum melakukan registrasi',
          'success': false
        });
      }

    });

  });

  router.get('/hello', expressJwt({
    secret: secret
  }), function(req, res) {
    return res.json({
      'info': 'hello word'
    });
  });

  module.exports = router;

}).call(this);
