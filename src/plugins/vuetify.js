import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ko from 'vuetify/lib/locale/ko';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#270949',
        secondary: '#4654a3',
        accent: '#e6e9f5',
        error: '#f95b3d',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { ko },
    current: 'ko',
  },
});
