import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    averageTemp: 0,
  },
  mutations: {
    setAverageTemp(state, val) {
      state.averageTemp = val;
    },
  },
  actions: {},
  modules: {},
});
