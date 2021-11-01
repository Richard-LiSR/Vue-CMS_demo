import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mg_state:true
  },
  mutations: {
    mg_state(state,access){
      state.mg_state = access
      console.log(access.mg_state);
    }
  },
  actions: {
  },
  modules: {
  }
})
