import STATE from './state';
import GETTERS from './getters';
import ACTIONS from './actions';
import MUTATIONS from './mutations';
import SERVICES from './services/index';

export default {
  namespaced: true,
  modules: {
    services: SERVICES,
  },
  state: STATE,
  getters: GETTERS,
  mutations: MUTATIONS,
  actions: ACTIONS,
};
