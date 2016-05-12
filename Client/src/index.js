import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Home from './components/Home.vue'
import App from './components/App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
