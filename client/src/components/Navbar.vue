<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand"><router-link :to="{ path: '/', params: { id: '' } }">Hacktivpress-Z</router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" @click="toHome">Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link">
             <router-link :to="{ path: '/myarticle'}"> My Article </router-link>
            </a>
          </li>
          <li class="dropdown order-1" v-show="!isLogin">
            <button type="button" id="btn_register" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle add-margin">Register
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right mt-2">
              <li class="px-3 py-2">
                <form class="form" role="form" v-on:submit.prevent="register()">
                  <div class="form-group">
                    <input id="regis_email" placeholder="Email" class="form-control form-control-sm" type="email" required="" v-model="email">
                  </div>
                  <div class="form-group">
                    <input id="regis_pwd" placeholder="Password" class="form-control form-control-sm" type="password" required="" v-model="password">
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                  </div>
                </form>
              </li>
            </ul>
          </li>
          <li class="dropdown order-1" v-show="!isLogin">
            <button type="button" id="btn_login" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle add-margin">Login
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right mt-2">
              <li class="px-3 py-2">
                <form class="form" role="form" v-on:submit.prevent="login()">
                  <div class="form-group">
                    <input id="login_email" placeholder="Email" class="form-control form-control-sm" type="text" required="" v-model="emailLogin">
                  </div>
                  <div class="form-group">
                    <input id="login_pwd" placeholder="Password" class="form-control form-control-sm" type="password" required="" v-model="passwordLogin">
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                    <button v-on:click="loginfb()" class="btn btn-info">Login with Facebook</button>
                  </div>
                  <div class="form-group text-center">
                    <small>
                      <a href="#" data-toggle="modal" data-target="#modalPassword">Forgot password?</a>
                    </small>
                  </div>
                </form>
              </li>
            </ul>
          </li>
        </ul>
        <button type="button" class="btn btn-outline-secondary"  v-on:click="logout()" v-show="isLogin">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false,
      email: '',
      password: '',
      emailLogin: '',
      passwordLogin: ''
    }
  },
  methods: {
    toHome: function () {
      this.$router.push('/')
    },
    register: function () {
      axios.post('http://localhost:3000/register', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response)
          alert(`Email ${this.email} successfully registered!`)
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          console.error(err)
        })
    },
    login: function () {
      axios.post('http://localhost:3000/login', {
        email: this.emailLogin,
        password: this.passwordLogin
      })
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userid', response.data.user._id)
          console.log('ini session--', localStorage.getItem('token'))
          alert('Login success!')
          this.emailLogin = ''
          this.passwordLogin = ''
          this.isLogin = true
        })
        .catch(err => {
          alert('Login failed!')
          console.error(err)
        })
    },
    loginfb () {
      window.FB.login((response) => {
        console.log('statusChangeCallback')
        console.log(response)
        if (response.status === 'connected') {
          console.log('masuk ke if di login fb')
          localStorage.setItem('fb_access_token', response.authResponse.accessToken)
          this.testAPI()
        } else {
          alert('please login')
        }
      })
    },
    testAPI () {
      console.log('Welcome!  Fetching your information.... ')
      axios.get('http://localhost:3000/loginFb', {
        headers: { fb_access_token: localStorage.getItem('fb_access_token') }
      })
        .then((response) => {
          console.log('data dari server', response.data)
          localStorage.setItem('token', response.data.token)
          this.$router.push('/todo')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logout: function () {
      localStorage.removeItem('token')
      this.isLogin = false
      alert('logged out')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
