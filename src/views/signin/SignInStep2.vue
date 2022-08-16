<template>
  <v-card-text>
    <v-form
      @submit.prevent="requestSignInCode">
      <vue-phone-number-input
        :translations="telInputOpts.translations"
        class="mb-4"
        placeholder="전화번호"
        no-country-selector
        default-country-code="KR"
        @update="inputPhone"
        v-model="form.rawPhone">
      </vue-phone-number-input>
      <v-btn
        :loading="loading"
        type="submit"
        color="primary"
        block>
        다음
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import AlertSupport from '@/components/mixins/alert_support';

import firebaseAuth from '@/plugins/firebase/auth';

export default {
  name: 'SignInStep2',
  mixins: [
    AlertSupport,
  ],
  components: {
    VuePhoneNumberInput,
  },
  data: () => ({
    loading: false,
    telInputOpts: {
      translations: {
        phoneNumberLabel: '전화번호',
        example: '예시 :',
      },
    },
    form: {
      rawPhone: '',
      phone: '',
    },
    firebaseAuth,
  }),
  methods: {
    async requestSignInCode() {
      try {
        this.loading = true;

        const confirmationResult = await firebaseAuth.signInWithPhoneNumber(this.form.phone);
        console.log('confirmationResult:', confirmationResult);

        this.$emit('step', 3);
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
    inputPhone({ formattedNumber }) {
      this.form.phone = formattedNumber;
    },
  },
};
</script>

<style scoped>

</style>
