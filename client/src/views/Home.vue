<template>
  <div class="container">
    <Navbar></Navbar>

    <div class="row">
        <!-- Blog Entries Column -->
        <div class="col-md-8">
          <h1 class="my-4">
          </h1>
          <router-view />

          <!-- Pagination -->
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" href="#">&larr; Older</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#">Newer &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Side Question -->
          <SideBar></SideBar>

          <!-- Categories Widget -->
          <Categories></Categories>

          <!-- Side Widget -->
          <SideWidget></SideWidget>

        </div>

      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Categories from '@/components/Categories.vue'
import Article from '@/components/Article.vue'
import SideWidget from '@/components/SideWidget.vue'
import SideBar from '@/components/SideBar.vue'
import { mapState, mapActions } from 'vuex'
// import axios from 'axios'

export default {
  name: 'home',
  components: {
    Navbar,
    Article,
    Categories,
    SideWidget,
    SideBar
  },
  created: function () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '975855832585758',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
    }
  },
  methods: {
    ...mapActions([
      'getArticles',
      'getCategories'
    ])
  },
  computed: {
    ...mapState([
      'articles'
    ])
  },
  mounted () {
    this.getArticles()
    this.getCategories()
  }
}
</script>
