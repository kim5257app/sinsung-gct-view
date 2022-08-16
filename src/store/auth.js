import Vue from 'vue';
import auth from '@/plugins/firebase/auth';
import fcm from '@/plugins/firebase/fcm';

export default {
  namespaced: true,
  state: {
    connected: false,
    initialized: false,
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
    'socket.connect': async ({ commit, dispatch }) => {
      commit('connected', true);
      await dispatch('initialize');
      await dispatch('authorization');
    },
    'socket.disconnect': ({ commit }) => {
      commit('initialized', false);
      commit('connected', false);
    },
    getAccessToken(_, { payload, cb }) {
      (new Vue()).$socket.emit('users.token.get', payload, cb);
    },
    authorization({ getters }) {
      if (getters.initialized) {
        (new Vue()).$socket.emit('auth.verify', {
          token: getters.userInfo.accessToken,
        }, (resp) => {
          console.log('resp:', resp);
        });
      }
    },
    unAuthorization({ commit }) {
      commit('userInfo', null);
      commit('token', '');
    },
    async initialize({ commit, dispatch }) {
      auth.onAuthStateChanged((user) => {
        console.log('onAuthStateChanged:', user);
        if (user != null) {
          commit('userInfo', user);
          commit('initialized', true);
          dispatch('authorization');
        }
      });
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
