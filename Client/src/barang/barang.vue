<template>

<button @click="tambahBarang" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">
    Tambah
</button>

<p></p>

<div class="alert alert-danger" v-if="error">
  <p>{{ error }}</p>
</div>
<div class="alert alert-warning" v-if="info">
  <p>{{ info }}</p>
</div>

<table class="table table-bordered table-striped table-responsive table-hover">
    <thead>
        <tr>
            <th>ID Barang</th>
            <th>Nama Barang</th>
            <th>Jenis Barang</th>
            <th>Harga Barang</th>
            <th>Jumlah Barang</th>
            <th>Tanggal Kadaluarsa</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="b in dataBarang">
            <td>{{ b.idBarang }}</td>
            <td>{{ b.namaBarang }}</td>
            <td>{{ b.jenisBarang }}</td>
            <td>{{ b.hargaBarang }}</td>
            <td>{{ b.jumlahBarang }}</td>
            <td>{{ b.tanggalKadaluarsa }}</td>
            <td>
                <button type="button" @click="editBarang(b)" class="btn btn-success" data-toggle="modal" data-target="#modal">
                    <i class="glyphicon glyphicon-pencil"></i>
                </button>
                <button type="button" @click="hapusBarang(b.idBarang)" class="btn btn-danger">
                    <i class="glyphicon glyphicon-trash"></i>
                </button>
            </td>
        </tr>
    </tbody>
</table>

<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="enable">Tambah Barang</h4>
                <h4 class="modal-title" v-else>Ubah Barang</h4>
            </div>
            <div class="modal-body">
                <form v-if="enable">
                    <div class="form-group">
                        <label>Nama Barang</label>
                        <input v-model="inputBarang.namaBarang" type="text" class="form-control" placeholder="Masukkan Nama Barang">
                    </div>
                    <div class="form-group">
                        <label>Jenis Barang</label>
                        <input v-model="inputBarang.jenisBarang" type="text" class="form-control" placeholder="Masukkan Jenis Barang">
                    </div>
                    <div class="form-group">
                        <label>Harga Barang</label>
                        <input v-model="inputBarang.hargaBarang" type="text" class="form-control" placeholder="Masukkan Harga Barang">
                    </div>
                    <div class="form-group">
                        <label>Jumlah Barang</label>
                        <input v-model="inputBarang.jumlahBarang" type="text" class="form-control" placeholder="Masukkan Jumlah Barang">
                    </div>
                    <div class="form-group">
                        <label>Tanggal Kadaluarsa</label>
                        <input v-model="inputBarang.tanggalKadaluarsa" type="date" class="form-control" placeholder="Masukkan Tanggal Kadaluarsa">
                    </div>
                </form>
                <form v-else>
                    <div class="form-group">
                        <label>ID Barang</label>
                        <input v-model="inputBarang.idBarang" type="text" class="form-control" placeholder="Masukkan ID Barang" disabled>
                    </div>
                    <div class="form-group">
                        <label>Nama Barang</label>
                        <input v-model="inputBarang.namaBarang" type="text" class="form-control" placeholder="Masukkan Nama Barang">
                    </div>
                    <div class="form-group">
                        <label>Jenis Barang</label>
                        <input v-model="inputBarang.jenisBarang" type="text" class="form-control" placeholder="Masukkan Jenis Barang">
                    </div>
                    <div class="form-group">
                        <label>Harga Barang</label>
                        <input v-model="inputBarang.hargaBarang" type="text" class="form-control" placeholder="Masukkan Harga Barang">
                    </div>
                    <div class="form-group">
                        <label>Jumlah Barang</label>
                        <input v-model="inputBarang.jumlahBarang" type="text" class="form-control" placeholder="Masukkan Jumlah Barang">
                    </div>
                    <div class="form-group">
                        <label>Tanggal Kadaluarsa</label>
                        <input v-model="inputBarang.tanggalKadaluarsa" type="date" class="form-control" placeholder="Masukkan Tanggal Kadaluarsa">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>
                <button type="button" v-if="enable" @click="simpanBarang(inputBarang)" class="btn btn-primary" data-dismiss="modal">Save</button>
                <button type="button" v-else @click="updateBarang(inputBarang, inputBarang.idBarang)" class="btn btn-success" data-dismiss="modal">Update</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import BarangController from './barang.controller';

export default {

  data() {
    return {
      dataBarang: {},
      inputBarang: {},
      enable: true,
      info: '',
      error: ''
    }
  },
  methods: {
    ambilBarang() {
      BarangController.ambilBarang(this)
    },
    tambahBarang() {
      this.enable = true
      this.inputBarang = {}
    },
    simpanBarang(b) {
      BarangController.simpanBarang(this, b)
      this.inputBarang = {}
      this.ambilBarang()
    },
    editBarang(b) {
      this.enable = false
      this.inputBarang.idBarang = b.idBarang
      this.inputBarang.namaBarang = b.namaBarang
      this.inputBarang.jenisBarang = b.jenisBarang
      this.inputBarang.hargaBarang = b.hargaBarang
      this.inputBarang.jumlahBarang = b.jumlahBarang
      this.inputBarang.tanggalKadaluarsa = b.tanggalKadaluarsa
    },
    updateBarang(b, idBarang) {
      BarangController.updateBarang(this, b, idBarang)
      this.inputBarang = {}
      this.ambilBarang()
    },
    hapusBarang(idBarang) {
      BarangController.hapusBarang(this, idBarang)
      this.ambilBarang()
    }
  },
  ready() {
    this.ambilBarang()
  }
}
</script>
