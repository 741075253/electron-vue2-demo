import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const resourceList = sessionStorage.getItem('resourceList')
export default new Vuex.Store({
  state: {
    resourceList: resourceList ? JSON.parse(resourceList) : [],
  },
  getters: {},
  mutations: {
    setResourceList(state, list) {
      state.resourceList = list || []
      sessionStorage.setItem('resourceList', JSON.stringify(list))
    },
  },
  actions: {},
  modules: {},
})
