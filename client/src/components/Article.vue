<template>
  <div>
    <h2>Article</h2>
    <div class="card mb-4" v-for="(article,i) in articles" :key="i" v-if="article.category._id == category">
      <img class="card-img-top" v-bind:src="article.image" alt="Card image cap">
      <div class="card-body">
        <router-link :to="{ path: '/' + article.category + '/' + article._id, params: { id: article.category._id, articleid: article._id } }">
          <h2 class="card-title">{{ article.title }}</h2>
        </router-link>
        <p class="card-text">{{ article.content }}</p>
      </div>
      <div class="card-footer text-muted">
        Posted on {{article.createdAt.slice(0, 10)}} by
        <a href="#">{{article.author.email}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Post',
  data () {
    return {
      category: this.$route.params.id
    }
  },
  computed: {
    ...mapState([
      'articles'
    ])
  },
  watch: {
    $route: function (to, from) {
      this.$router.go()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
