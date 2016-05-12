(function() {
  'use strict';

  var user,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  user = new Schema({
    email: {
      name: 'email',
      type: String,
      required: true
    },
    passwordHash: {
      name: 'password_hash',
      type: String,
      required: true
    },
    passwordSalt: {
      name: 'password_salt',
      type: String,
      required: true
    },
    enable: {
      type: Boolean,
      required: true
    }
  }, {
    collection: 'tb_user'
  });

  module.exports = mongoose.model('User', user);

}).call(this);
