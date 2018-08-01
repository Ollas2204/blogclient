import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let BASE_URL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    idUser: localStorage.getItem('idUser'),
    nameUser: localStorage.getItem('nameUser'),
    articles: [],
    editArticle: null
  },
  mutations: {
    editData: function (state, wantToEdit) {
      state.editArticle = wantToEdit
    }
  },
  actions: {
    login: function ({ commit, state }, payload) {
      axios.post(`${BASE_URL}/authors/signin`, {
        email: payload.email,
        password: payload.password
      })
        .then(({data}) => {
          if (data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('idUser', data.idUser)
            localStorage.setItem('nameUser', data.nameUser)
            state.nameUser = data.nameUser
            state.token = data.token
            state.idUser = data.idUser
          } else {
            alert(data.msg)
          }
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data.msg))
        })
    },
    get_data: function ({ commit, state }, payload) {
      axios.get(`${BASE_URL}/articles`)
        .then(({data}) => {
          state.articles = data.articles
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    },
    editArticle: function ({ commit }, payload) {
      console.log('hitted');
      commit('editData', payload)
    }
  }
})
