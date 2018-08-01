<template>
<div class="container">
  <div class="section">

    <div class="row">
      <div class="col s12 center">
        <h3>
            <i class="mdi-content-send brown-text"></i>
          </h3>
        <div class="row">

          <div class="col s12 m8 center">
            <h3>
                <i class="mdi-content-send brown-text"></i>
              </h3>
            <h4>{{article.title}}</h4>
            <p class="left-align light">{{article.content}}</p>
            <div class="row" v-if="article.authorId._id == idUser">
              <div @click="openModal()" class="center waves-effect waves-light btn-small">Edit Blog </div>
              <div @click="edit()" class="center waves-effect waves-light btn-small">Delete Blog </div>
            </div>
          </div>

          <div class="col s12 m4">
            <div class="icon-block">
              <h5 class="center">List Comment</h5>
              <div class="row" v-for="comment in article.comments" :key="comment._id">
                <div class="input-field col s12">
                  <p class="light">{{comment.body}} by <b>{{comment.authorName}}</b> {{JSON.stringify(article.createdAt)}}</p>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea placeholder="Comment" v-model="newComment" id="textarea1" class="materialize-textarea"></textarea>
                </div>
              </div>
              <div @click="createComment()" class="center waves-effect waves-light btn-small">Create Comment </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal2" class="modal">
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
      <div @click="edit(true)" class="btn waves-effect waves-light teal small"> Edit </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    article: {},
    newComment: '',
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
  created() {
    this.get_data()
  },
  watch: {
    articles: function(value) {
      this.article = value.filter(e => e._id === this.$route.params.id)[0]
      this.title = this.article.title
      this.content = this.article.content
    }
  },
  mounted() {
    this.article = this.articles.filter(e => e._id === this.$route.params.id)[0]
    this.title = this.article.title
    this.content = this.article.content
  },
  methods: {
    ...mapActions([
      'login',
      'get_data'
    ]),
    openModal() {
      $('#modal2').modal('open');
    },
    edit(bool) {
      let self = this
      if (bool) {
        this.$axios.put(`articles/${this.$route.params.id}/edit`, {
            title: self.title,
            content: self.content
          }, {
            headers: {
              token: this.token
            }
          })
          .then(() => {
            $('#modal2').modal('close');
            self.get_data()
          })
          .catch(err => alert(JSON.stringify(err)))
      } else {
        this.$axios.delete(`articles/${this.$route.params.id}/delete`, {
            headers: {
              token: this.token
            }
          })
          .then(() => self.$router.push({
            path: '/'
          }))
          .catch(err => alert(JSON.stringify(err)))
      }
    },
    createComment() {
      let self = this
      this.$axios.put(`articles/${this.$route.params.id}/comment`, {
          body: this.newComment
        }, {
          headers: {
            name: this.nameUser
          }
        })
        .then(() => self.get_data())
        .catch(err => alert(JSON.stringify(err)))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
