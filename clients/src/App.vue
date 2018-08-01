<template>
  <div id="app">
  <nav class="white" role="navigation">
    <div class="nav-wrapper container">
    <router-link to="/" class="brand-logo">🎌 Ollas Blog</router-link>
      <ul class="right hide-on-med-and-down">
        <li v-if="!token"> <router-link to="/login">Login</router-link></li>
        <li v-else @click="out()"> <a>Logout</a> </li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li v-if="!token"> <router-link to="/login">Login</router-link></li>
        <li v-if="token" @click="out()"> Logout </li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'app',
  data: () => ({
    component: 'app'
  }),
  computed: {
    ...mapState([
      'token',
      'idUser',
      'articles'
    ])
  },
  methods: {
    ...mapActions([
      'get_data'
    ]),
    out () {
      localStorage.clear()
      window.location = '/'
    }
  }

}
</script>

<style>
</style>
