<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Sign Up</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
      <p>{{ info }}</p>
    </div>
    <div class="alert alert-success" v-if="info">
      <p>{{ info }}</p>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
    </div>
    <button class="btn btn-primary" @click="submit(credentials)">Sign Up</button>
  </div>
</template>
<script>
  import authentication from './authentication.controller'

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: '',
        info: ''
      }
    },
    methods: {
      submit(credentials) {
        authentication.signUp(this, credentials);
        this.credentials = {}
      }
    }
  }

</script>
