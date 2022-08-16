<template>
  <v-card-text>
    <v-img
      :src="imgLogo"
      class="mb-8">
    </v-img>
    <v-card-text>
      <v-form
        @submit.prevent="nextStep">
        <v-btn
          :loading="loading"
          type="submit"
          color="primary"
          block>
          시작
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card-text>
</template>

<script>
import firebaseAuth from '@/plugins/firebase/auth';
import AlertSupport from '@/components/mixins/alert_support';

import imgLogo from '@/assets/logo.png';

export default {
  name: 'SignInStep1',
  mixins: [
    AlertSupport,
  ],
  props: {
    recaptcha: {
      required: true,
    },
  },
  data: () => ({
    loading: false,
    imgLogo,
    firebaseAuth,
  }),
  methods: {
    nextStep() {
      try {
        this.loading = true;

        const verifier = firebaseAuth.makeRecaptchaVerifier(this.recaptcha, (resp) => {
          console.log('resp:', resp);
        });
        console.log('resp:', verifier);

        this.$emit('step', 2);
      } catch (error) {
        this.showAlert({
          color: 'error',
          message: error.message,
          timeout: 5000,
        });

        firebaseAuth.resetRecaptchaVerifier();
        firebaseAuth.signInWithPhoneNumber(null);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
