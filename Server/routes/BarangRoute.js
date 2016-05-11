(function() {
  'use strict';

  var express = require('express'),
    router = express.Router(),
    logger = require('../config/logger'),
    jsonwebtoken = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    uuid = require('node-uuid'),
    Barang = require('../models/Barang'),
    secret = 'ini adalah kata kunci 12345';

  router.get('/barang', function(req, res) {
    return Barang.find(function(err, barang) {
      if (err) {
        logger.error('error bung ', err);
        return res.json(err);
      }

      return res.json({
        'barangs': barang,
        'success': true
      });

    });
  });

  router.post('/barang', expressJwt({
    secret: secret
  }), function(req, res) {
    var barang = new Barang({
      idBarang: uuid.v4(),
      namaBarang: req.body.namaBarang,
      jenisBarang: req.body.jenisBarang,
      hargaBarang: req.body.hargaBarang,
      jumlahBarang: req.body.jumlahBarang,
      tanggalKadaluarsa: req.body.tanggalKadaluarsa
    });

    barang.save(function(err, b) {
      if (err) {
        logger.error('error bung ', err);
        return res.json(err);
      }

      return res.json({
        'info': 'data berhasil disimpan',
        'success': true
      });

    });

  });

  router.put('/barang/:idBarang', expressJwt({
    secret: secret
  }), function(req, res) {
    var idBarang = req.params.idBarang;

    Barang.findOne({
      idBarang: idBarang
    }, function(err, barang) {
      if (err) {
        logger.error('error bung ', err);
        return res.json(err);
      }

      barang.namaBarang = req.body.namaBarang;
      barang.jenisBarang = req.body.jenisBarang;
      barang.hargaBarang = req.body.hargaBarang;
      barang.jumlahBarang = req.body.jumlahBarang;
      barang.tanggalKadaluarsa = req.body.tanggalKadaluarsa;
      barang.save();

      return res.json({
        'info': 'data berhasil diubah',
        'success': true
      });

    });

  });

  router.delete('/barang/:idBarang', expressJwt({
    secret: secret
  }), function(req, res) {
    var idBarang = req.params.idBarang;

    Barang.remove({
      idBarang: idBarang
    }, function(err, barang) {
      if (err) {
        logger.error('error bung ', err);
        return res.json(err);
      }

      return res.json({
        'info': 'data berhasil dihapus',
        'success': true
      });

    });

  });

  module.exports = router;

}).call(this);
