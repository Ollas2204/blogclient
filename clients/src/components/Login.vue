<template>
  <div class="container">
    <div class="section">

      <div class="row">
        <div class="col s12 center">
          <h3>
            <i class="mdi-content-send brown-text"></i>
          </h3>
          <h4>Welcome to Ollas Blog</h4>
          <div class="row">
            <div class="col s12 m6">
              <div class="icon-block">
                <h5 class="center">Login</h5>
                <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s12">
                        <input v-model="emailLog" id="email" type="email" class="validate">
                        <label for="email">Email</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <input v-model="passwordLog" id="password" type="password" class="validate">
                        <label for="password">Password</label>
                      </div>
                    </div>
                    <div @click="login()" class="center waves-effect waves-light btn-small"> Login </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col s12 m6">
              <div class="icon-block">
                <h5 class="center">Register</h5>

                <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s6">
                        <input v-model="firstname" id="first_name" type="text" class="validate">
                        <label for="first_name">First Name</label>
                      </div>
                      <div class="input-field col s6">
                        <input v-model="lastname" id="last_name" type="text" class="validate">
                        <label for="last_name">Last Name</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <input v-model="password" id="passwordRegister" type="password" class="validate">
                        <label for="passwordRegister">Password</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <input v-model="email" id="emailRegister" type="email" class="validate">
                        <label for="emailRegister">Email</label>
                      </div>
                    </div>
                    <div @click="register()" class="center waves-effect waves-light btn-small"> Register </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data: () => ({
    emailLog: '',
    passwordLog: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }),
  computed: {
    ...mapState([
      'token',
      'idUser',
      'articles'
    ])
  },
  watch: {
    token: function (value) {
      if (value) {
        this.$router.push({path: '/'})
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'get_data'
    ]),
    move () {
      this.$modal.show('hello-world')
    },
    login () {
      this.$store.dispatch('login', {
        email: this.emailLog,
        password: this.passwordLog
      })
        .then(() => null)
        .catch(err => alert(JSON.stringify(err)))
      this.emailLog = ''
      this.passwordLog = ''
    },
    register () {
      this.$axios.post(`authors/signup`, {
        fullName: this.firstname + ' ' + this.lastname,
        email: this.email,
        password: this.password
      }, {
        headers: {
          token: this.token
        }
      })
        .then(() => alert('Silahkan Login'))
        .catch(err => alert(JSON.stringify(err)))
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
