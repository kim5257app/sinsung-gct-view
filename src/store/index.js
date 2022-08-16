import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line import/no-cycle
import alert from './alert';
import auth from './auth';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    auth,
    router,
  },
});
