(function() {
  'use strict';

  var barang,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  barang = new Schema({
    idBarang: {
      name: 'id_barang',
      type: String,
      required: true
    },
    namaBarang: {
      name: 'nama_barang',
      type: String,
      required: true
    },
    jenisBarang: {
      name: 'jenis_barang',
      type: String,
      required: true
    },
    hargaBarang: {
      name: 'harga_barang',
      type: Number,
      required: true
    },
    jumlahBarang: {
      name: 'jumlah_barang',
      type: Number,
      required: true
    },
    tanggalKadaluarsa: {
      name: 'tanggal_kadaluarsa',
      type: Date,
      required: true
    }
  }, {
    collection: 'tb_barang'
  });

  module.exports = mongoose.model('Barang', barang);

}).call(this);
