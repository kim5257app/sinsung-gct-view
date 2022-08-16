<template>
  <v-app id="app">
    <v-main>
      <router-view/>
    </v-main>
    <v-snackbar
      v-model="alertShowFlag"
      :color="alertInfo.color"
      :timeout="alertInfo.timeout"
      top>
      {{ alertInfo.message }}
    </v-snackbar>
    <dlg-add-name
      v-if="showAddName"
      :show.sync="showAddName">
    </dlg-add-name>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import dialogSupport, { makeShowFlag } from '@/components/mixins/dialog_support';
import DlgAddName from '@/components/dialog/DlgAddName.vue';

export default {
  name: 'App',
  mixins: [
    dialogSupport,
  ],
  components: {
    DlgAddName,
  },
  computed: {
    ...mapGetters({
      connected: 'auth/connected',
      initialized: 'auth/initialized',
      userInfo: 'auth/userInfo',
      verified: 'auth/verified',
      alertShow: 'alert/alertShow',
      alertInfo: 'alert/alertInfo',
      showPermission: 'auth/showPermission',
    }),
    showAddName: makeShowFlag('show_add_name'),
    alertShowFlag: {
      get() {
        return this.alertShow;
      },
      set(value) {
        this.updateShow(value);
      },
    },
  },
  watch: {
    connected: {
      immediate: false,
      handler() {
        if (this.connected && this.initialized) {
          this.$router.checkAuth();
        }
      },
    },
    initialized: {
      immediate: false,
      handler() {
        if (this.connected && this.initialized) {
          this.$router.checkAuth();
        }
      },
    },
    verified: {
      immediate: true,
      async handler(value) {
        if (this.connected && this.initialized) {
          this.$router.checkAuth();
        }

        if (value) {
          if (this.userInfo.name == null) {
            this.showAddName = true;
          }
        }
      },
    },
  },
  methods: {
    ...mapMutations({
      updateShow: 'alert/updateShow',
      updateShowPermission: 'auth/showPermission',
    }),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
