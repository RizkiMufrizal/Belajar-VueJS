import { router } from '../index';

const API_URL = 'http://127.0.0.1:3000'
const API_URL_SIGNUP = API_URL + '/api/user'
const API_URL_SIGNIN = API_URL + '/api/authenticate'

export default {

  user: {
    authenticated: false
  },

  signIn(context, userAuth, redirect) {
    context.$http.post(API_URL_SIGNIN, userAuth, (data) => {

      if (data.success) {
        this.user.authenticated = true
        localStorage.setItem('token', data.token)
        context.credentials = {}

        router.go(redirect)

      } else {
        context.info = data.info
        console.log(data.info);
        console.log(context.info);
      }

    }).error((err) => {
      context.error = err
    })
  },

  signUp(context, userAuth) {
    context.$http.post(API_URL_SIGNUP, userAuth, (data) => {

      context.info = data.info

    }).error((err) => {
      context.error = err
    })
  }

}
