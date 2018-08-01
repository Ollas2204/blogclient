<template>
  <div class="container">
    <div class="section">
      <div class="row">
        <router-link v-for="article in articles" :to="'/blog/'+article._id" style="color:black" :key="article._id">
          <div class="col s12 m4">
            <div class="icon-block">
              <h5 class="center">{{article.title}}</h5>

              <p class="light">{{article.content.slice(0, 20)}}</p>
              <p class="light">by <b>{{article.authorId.fullName}}</b> {{JSON.stringify(article.createdAt)}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListBlog',
  props: ['articles']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: 'teal';
}
.router-link:hover {
  color: #00f;
}
</style>
