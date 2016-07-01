<template>
  <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" v-link="'home'">Belajar Vue JS</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a v-link="'home'">Home</a></li>
            <li><a v-if="user" v-link="'barang'">Data Barang</a></li>
            <li><a v-if="!user" v-link="'signIn'">Sign In</a></li>
            <li><a v-if="!user" v-link="'signUp'">Sign Up</a></li>
            <li><a v-if="user" @click="logout" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
</template>

<script>
import AuthenticationController from './authentication/authentication.controller';

export default {
  data() {
    return {
      user: AuthenticationController.user.authenticated
    }
  },
  methods: {
    logout() {
      AuthenticationController.logout()
      this.user = AuthenticationController.user.authenticated
    }
  },
  ready() {
    AuthenticationController.checkAuthenticate()
    this.user = AuthenticationController.user.authenticated
  }
}
</script>
