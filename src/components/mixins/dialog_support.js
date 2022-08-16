import { mapActions, mapGetters } from 'vuex';

export function makeShowFlag(name) {
  return {
    get() {
      return this.dlgInfo[name] != null && this.dlgInfo[name];
    },
    set(value) {
      if (this[name] !== value) {
        if (value) {
          this.showDialog(name);
        } else {
          this.closeDialog(name);
        }
      }
    },
  };
}

export default {
  name: 'dialog-support',
  data: () => ({
    dlgInfo: {},
  }),
  computed: {
    ...mapGetters({
      dlgStack: 'router/dlgStack',
    }),
  },
  watch: {
    dlgStack(value) {
      this.dlgInfo = value.reduce((acc, name) => ({ ...acc, [name]: true }), {});
    },
  },
  methods: {
    ...mapActions({
      showDialog: 'router/showDialog',
      closeDialog: 'router/closeDialog',
    }),
  },
};
