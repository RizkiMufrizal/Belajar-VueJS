import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Home from './home/home.vue'
import App from './App.vue'
import SignIn from './authentication/signin.vue'
import SignUp from './authentication/signup.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/signIn': {
    component: SignIn
  },
  '/signUp': {
    component: SignUp
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
