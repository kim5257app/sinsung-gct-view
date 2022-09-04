import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    loading: false,
    roomList: [],
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    roomList(state) {
      return state.roomList;
    },
  },
  mutations: {
    loading(state, value) {
      state.loading = value;
    },
    roomList(state, items) {
      state.roomList = items;
    },
  },
  actions: {
    getRoomList({ commit, dispatch }) {
      commit('loading', true);

      (new Vue()).$socket.emit('rooms.list.get', {}, (resp) => {
        console.log('rooms.list.get:', resp);
        if (resp.result === 'success') {
          commit('roomList', resp.items);
        } else {
          dispatch('alert/showAlert', {
            color: 'error',
            message: resp.message,
          }, { root: true });
        }

        commit('loading', false);
      });
    },
  },
};
