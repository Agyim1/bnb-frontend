import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    update(state, newUser) {
      state.user = newUser;
    }
  },
  actions: {
    update({ commit }, newUser) {
      commit('update', newUser);
    }
  },
  plugins: [createPersistedState()],
});
