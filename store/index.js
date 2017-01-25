import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user:"",
    isLogin:false
  },
  mutations: {
    login (state,user) {
      state.user = user;
      state.isLogin = true;
    }
  }
})

export default store;