import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usergroup: "",
 
  },
  mutations: {
    // 改变值
    changeval(state, data) {
      state.usergroup = data
    },
    // 清空
    deleall() {
      this.state.usergroup = ''
    }
  },
  actions: {},
  modules: {}
})