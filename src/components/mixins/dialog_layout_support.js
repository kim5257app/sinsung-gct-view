export default {
  name: 'dialog-layout-support',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showFlag: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('update:show', value);
      },
    },
  },
};
