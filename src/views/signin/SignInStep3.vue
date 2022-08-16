<template>
  <v-card-text>
    <v-form
      @submit.prevent="confirmSignInCode">
      <v-text-field
        v-model="form.code"
        class="mb-4"
        placeholder="인증번호"
        dense
        outlined
        hide-details>
      </v-text-field>
      <v-btn
        :loading="loading"
        type="submit"
        color="primary"
        block>
        확인
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script>
import firebaseAuth from '@/plugins/firebase/auth';
import AlertSupport from '@/components/mixins/alert_support';

export default {
  name: 'SignInStep3',
  mixins: [
    AlertSupport,
  ],
  data: () => ({
    loading: false,
    form: {
      code: '',
    },
    firebaseAuth,
  }),
  methods: {
    async confirmSignInCode() {
      try {
        this.loading = true;

        const credential = await firebaseAuth.confirmSignInCode(this.form.code);
        console.log('credential:', credential);
      } catch (error) {
        this.showAlert({
          color: 'error',
          message: error.message,
          timeout: 5000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
