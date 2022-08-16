<template>
  <v-container
    class="fill-height">
    <v-layout
      justify-center
      align-center>
      <v-card
        :width="320"
        tile
        flat>
        <div
          @step="changeStep"
          :recaptcha="recaptchaElement"
          :is="`sign-in-step-${step}`">
        </div>
        <div
          v-show="false"
          ref="recaptcha">
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import SignInStep1 from '@/views/signin/SignInStep1.vue';
import SignInStep2 from '@/views/signin/SignInStep2.vue';
import SignInStep3 from '@/views/signin/SignInStep3.vue';

export default {
  name: 'SignInView',
  components: {
    SignInStep1,
    SignInStep2,
    SignInStep3,
  },
  data: () => ({
    step: 1,
    recaptchaElement: null,
  }),
  methods: {
    changeStep(step) {
      this.step = step;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.recaptchaElement = this.$refs.recaptcha;
    });
  },
};
</script>

<style scoped>

</style>
