<template>
  <div class="home">
    <HelloWorld/>
    <ListBlog :articles="articles"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ListBlog from '@/components/ListBlog.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    component: 'home'
  }),
  computed: {
    ...mapState([
      'token',
      'idUser',
      'articles'
    ])
  },
  created () {
    this.get_data()
  },
  components: {
    HelloWorld,
    ListBlog
  },
  methods: {
    ...mapActions([
      'login',
      'get_data'
    ])
  }
}
</script>
