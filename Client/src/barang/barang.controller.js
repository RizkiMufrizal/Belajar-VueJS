const API_URL = 'http://127.0.0.1:3000'
const API_URL_BARANG = API_URL + '/api/barang'

export default {

  ambilBarang(context) {
    context.$http.get({
      url: API_URL_BARANG,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((data) => {
      context.dataBarang = data.barangs
    }, (err) => {
      context.error = err
    })
  },

  simpanBarang(context, barang) {
    context.$http({
      url: API_URL_BARANG,
      method: 'POST',
      data: barang,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((data) => {
      context.info = data.info
    }, (err) => {
      context.error = err
    })

  },

  updateBarang(context, barang, idBarang) {
    context.$http({
      url: API_URL_BARANG + '/' + idBarang,
      method: 'PUT',
      data: barang,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((data) => {
      context.info = data.info
    }, (err) => {
      context.error = err
    })
  },

  hapusBarang(context, idBarang) {
    context.$http({
      url: API_URL_BARANG + '/' + idBarang,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((data) => {
      context.info = data.info
    }, (err) => {
      context.error = err
    })
  }

}
