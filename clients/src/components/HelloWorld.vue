<template>
  <div id="index-banner" class="parallax-container">
    <div class="section no-pad-bot">
      <div class="container">
        <br>
        <br>
        <h1 class="header center teal-text text-lighten-2">I blog because I have something to say</h1>
        <div class="row center">
          <h5 class="header col s12 light">If somebody crafts an interesting tweet that'll lead me to their blog, I'm going to their blog</h5>
        </div>
        <div class="row center">
          <div @click="move()" class="btn-large waves-effect waves-light teal lighten-1">
            🎌 Add New Blog
          </div>
        </div>
      </div>
    </div>
    <div class="parallax">
      <img src="../assets/background1.jpg" alt="background img 1">
    </div>
    <div id="modal1" class="modal">
      <div class="container center">
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="title" id="title" v-model="title" type="text" class="validate">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea placeholder="content" v-model="content" id="textarea1" class="materialize-textarea"></textarea>
          </div>
        </div>
        <div @click="create()" class="btn waves-effect waves-light teal small"> CREATE </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data: () => ({
    title: '',
    content: ''
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
      'login',
      'get_data'
    ]),
    move () {
      if (this.token) {
        $('#modal1').modal('open');
      } else {
        alert('Please Login')
      }
    },
    create () {
      if (this.token) {
        let self = this
        this.$axios.post(`articles/`, {
          title: this.title,
          content: this.content
        }, {
          headers: {
            token: this.token
          }
        })
          .then(() => {
            $('#modal1').modal('close');
            self.get_data()
          })
          .catch(err => alert(JSON.stringify(err)))
        this.title = ''
        this.content = ''
      } else {
        alert('Please Login')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#modal1 {
  z-index:0;
}
</style>
