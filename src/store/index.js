/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from  'vuex'
// import router from '../router/index.js'
// import createPersistedState from "vuex-persistedstate"
// import api from '../apiClient/index.js'
import ModuleUsers from './modules/users'
import ModuleCategories from './modules/categories/index'
import ModuleTopics from './modules/topics'
import ModulePins from './modules/pins/index'
import ModuleEvents from './modules/events'
import ModuleServices from './modules/services'

Vue.use(Vuex)

const store = new Store({
  devtools: true,
  modules: {
    categories: ModuleCategories,
    topics: ModuleTopics,
    pins: ModulePins,
    events: ModuleEvents,
    users: ModuleUsers,
    services: ModuleServices,
  },

  state: {
    namespaced: true,
    newKey: null,
    nextRoute: null,
  },

  // plugins: [
  //   createPersistedState(),
  // ],

  getters: {
    getKey(state) {
      return state.newKey;
    },
  },

  actions: {    
    setNextRoute ({ commit }, { route }) {
      commit('SET_NEXT_ROUTE', { route })
    }
  },

  mutations: {
    setKey (state, payload) {
      state.newKey = payload;
      console.log('mutations -> state/newKey : _SETKEY');
    },

    SET_NEXT_ROUTE (state, { route }) {
      state.nextRoute = route
    }
  },
});

export default store;

