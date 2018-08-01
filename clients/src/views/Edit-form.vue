<template >
  <div class="" style="margin: 5% 0 0 0;">
    <div class="container">
      <div class="input-field col s6">
        <p>Title</p>
        <input id="title" type="text" class="validate" v-model='newTitle'>
      </div>
      <div class="input-field col s12">
        <p>Article</p>
        <Vueditor ref="editor" style="position:static;"></Vueditor>
      </div>
      <br>
      <br>
      <div class="row">
        <div class="col s6">
          <a class="btn btn-block" @click='submit'>Update</a>
        </div>
        <div class="col s6">
          <a class="btn btn-block" @click='cancel'>Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vueditor from 'vueditor'

export default {
  data () {
    return {
      dataEdit: null,
      newTitle: ''
    }
  },
  component : {
    Vueditor
  },
  created () {
    this.dataEdit = this.$store.state.editArticle
    this.newTitle = this.$store.state.editArticle.title
  },
  mounted () {
    this.$refs.editor.setContent(this.dataEdit.content)
  },
  methods: {
    submit () {
      const data = {
        id: this.dataEdit._id,
        title: this.newTitle,
        content: this.$refs.editor.getContent()
      }
      axios({
        method: 'put',
        url: 'http://35.198.242.167/articles/edit',
        data: data
      }).then(response => {
        this.$router.push('/')
      }).catch(err => {
        console.log(err);
      })
    },
    cancel () {
      this.$refs.editor.setContent('')
      this.dataEdit = null
      this.$router.push('/')
    }
  }

}
</script>

<style lang="css">
</style>
