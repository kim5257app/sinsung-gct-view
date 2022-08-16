export default {
  namespaced: true,
  state: {
    show: false,
    timeout: 5000,
    color: '',
    message: '',
  },
  getters: {
    alertShow(state) {
      return state.show;
    },
    alertInfo(state) {
      return {
        color: state.color,
        message: state.message,
        timeout: state.timeout,
      };
    },
  },
  mutations: {
    updateShow(state, value) {
      state.show = value;
    },
    showAlert(state, { color, message, timeout }) {
      state.color = color;
      state.message = message;
      state.timeout = (timeout != null) ? timeout : 5000;
      state.show = true;
    },
  },
  actions: {
  },
};
