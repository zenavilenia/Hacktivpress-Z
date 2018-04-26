import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Articles from './components/Articles'
import Article from './components/Article'
import DetailArticle from './components/DetailArticle'
import MyArticle from './components/MyArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Articles,
          props: true
        },
        {
          path: 'myarticle',
          component: MyArticle,
          props: true
        },
        {
          path: ':id',
          component: Article,
          props: true
        },
        {
          path: ':id/:articleid',
          component: DetailArticle,
          props: true
        }
      ]
    }
  ]
})
