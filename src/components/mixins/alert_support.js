import { mapMutations } from 'vuex';

export default {
  name: 'alert-support',
  methods: {
    ...mapMutations({
      showAlert: 'alert/showAlert',
    }),
  },
};
