<template>
  <layout-dialog
    title="이름 설정"
    :show.sync="showFlag"
    @click:close="$router.goBack()"
    persistent
    :max-width="320">
    <v-form
      @submit.prevent="addName">
      <v-text-field
        v-model="form.name"
        label="이름"
        hide-details
        class="mb-4">
      </v-text-field>
      <v-btn
        :loading="loading"
        type="submit"
        color="primary"
        block>
        확인
      </v-btn>
    </v-form>
  </layout-dialog>
</template>

<script>
import LayoutDialog from '@/components/dialog/LayoutDialog.vue';
import dialogLayoutSupport from '@/components/mixins/dialog_layout_support';
import alertSupport from '@/components/mixins/alert_support';
import firebaseAuth from '@/plugins/firebase/auth';

export default {
  name: 'DlgAddName',
  mixins: [
    dialogLayoutSupport,
    alertSupport,
  ],
  components: {
    LayoutDialog,
  },
  data: () => ({
    loading: false,
    form: {
      name: '',
    },
    firebaseAuth,
  }),
  methods: {
    async addName() {
      this.loading = true;
      await firebaseAuth.updateProfile(this.form.name);

      this.$socket.emit('users.update', this.form, (resp) => {
        if (resp.result === 'success') {
          // Do nothing.
        } else {
          this.showAlert({
            color: 'error',
            message: resp.message,
          });
        }

        this.loading = false;
        this.$router.goBack();
      });
    },
  },
};
</script>

<style scoped>

</style>
