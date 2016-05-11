(function() {
  'use strict';

  var user,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  user = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
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
