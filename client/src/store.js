import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    categories: []
  },
  mutations: {
    addArticles (state, payload) {
      state.articles = payload.data
    },
    addCategories (state, payload) {
      state.categories = payload.data
    },
  },
  actions: {
    getArticles ({ commit }) {
      axios.get(`http://localhost:3000/articles`)
        .then(response => {
          commit('addArticles', response.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getCategories ({ commit }) {
      axios.get(`http://localhost:3000/categories`)
        .then(response => {
          commit('addCategories', response.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})
