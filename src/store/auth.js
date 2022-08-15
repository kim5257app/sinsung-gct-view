import Vue from 'vue';
import fcm from '@/plugins/firebase/fcm';

export default {
  namespaced: true,
  state: {
    connected: true,
    initialized: true,
    userInfo: null,
    showPermission: false,
  },
  getters: {
    connected(state) {
      return state.connected;
    },
    initialized(state) {
      return state.initialized;
    },
    verified(state) {
      return (state.userInfo != null);
    },
    userInfo(state) {
      return state.userInfo;
    },
    showPermission(state) {
      return state.showPermission;
    },
  },
  mutations: {
    connected(state, value) {
      state.connected = value;
    },
    initialized(state, value) {
      state.initialized = value;
    },
    userInfo(state, value) {
      state.userInfo = value;
    },
    showPermission(state, value) {
      state.showPermission = value;
    },
  },
  actions: {
    'socket.connect': ({ commit, dispatch }) => {
      commit('connected', true);
      dispatch('authorization');
    },
    'socket.disconnect': ({ commit }) => {
      commit('initialized', false);
      commit('connected', false);
    },
    getAccessToken(_, { payload, cb }) {
      (new Vue()).$socket.emit('users.token.get', payload, cb);
    },
    authorization({ state, commit, dispatch }) {
      const { connected } = state;
      const token = Vue.ls.get('access');

      if (connected && token != null) {
        (new Vue()).$socket.emit('users.token.verify', { token }, async (resp) => {
          console.log('resp:', resp);
          if (resp.result === 'success') {
            commit('userInfo', resp.userInfo);

            await fcm.initialize();

            const permission = await fcm.permission();
            if (permission === 'granted') {
              dispatch('registerFCMToken');
            } else if (permission === 'default') {
              commit('showPermission', true);
            }
          } else {
            // 에러 표시
          }

          commit('initialized', true);
        });
      }
    },
    unAuthorization({ commit }) {
      Vue.ls.remove('access');
      commit('userInfo', null);
      commit('token', '');
    },
    async registerFCMToken() {
      console.log('token:', await fcm.getFCMToken());
      (new Vue()).$socket.emit('fcm.token.add', {
        token: await fcm.getFCMToken(),
      }, (resp) => {
        if (resp.result !== 'success') {
          console.error('resp:', resp);
        }
      });
    },
  },
};
