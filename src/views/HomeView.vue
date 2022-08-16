<template>
  <v-container>
    <v-app-bar
      app
      color="primary">
      <v-app-bar-nav-icon
        dark>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-layout>
      {{ userInfo.displayName }}
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
    }),
  },
};
</script>

<style scoped>

</style>
