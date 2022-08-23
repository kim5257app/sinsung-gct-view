import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    roomList: [],
  },
  getters: {
    roomList(state) {
      return state.roomList;
    },
  },
  mutations: {
    roomList(state, items) {
      state.roomList = items;
    },
  },
  actions: {
    getRoomList({ commit, dispatch }) {
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
      });
    },
  },
};
