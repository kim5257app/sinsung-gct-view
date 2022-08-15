export default {
  namespaced: true,
  state: {
    dlgStack: [],
    path: '',
    replacePath: '',
    route: null,
    initPath: '/',
  },
  getters: {
    dlgStack(state) {
      return state.dlgStack;
    },
    path(state) {
      return state.path;
    },
    replacePath(state) {
      return state.replacePath;
    },
    route(state) {
      return state.route;
    },
    initPath(state) {
      return state.initPath;
    },
  },
  mutations: {
    push(state, path) {
      console.log('path', path);
      state.path = path;
    },
    replace(state, path) {
      console.log('replace path', path);
      state.replacePath = path;
    },
    route(state, value) {
      state.route = value;
    },
    initPath(state, value) {
      state.initPath = value;
    },
  },
  actions: {
    showDialog({ state }, name) {
      console.log('showDialog:', name);
      return state.dlgStack.push(name) - 1;
    },
    closeDialog({ state }, name) {
      const idx = state.dlgStack.findIndex((item) => (item === name));
      state.dlgStack.splice(idx, 1);
    },
    popDialog({ state }) {
      console.log('popDialog');
      return state.dlgStack.pop();
    },
    cleanupDialogStack({ state }) {
      state.dlgStack = [];
    },
  },
};
