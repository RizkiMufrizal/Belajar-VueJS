<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
      <p>{{ info }}</p>
    </div>
    <div class="alert alert-danger" v-if="info">
      <p>{{ info }}</p>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
    </div>
    <button class="btn btn-primary" @click="submit(credentials)">Sign In</button>
  </div>
</template>
<script>
  import authentication from '../authentication'

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
        authentication.signIn(this, credentials);
      }
    }
  }

</script>
