import Vue from 'vue';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import path from '@/util/path';
import store from '../store';

const connection = SocketIO(path.apiHost, {
  transports: ['websocket'],
});

Vue.use(new VueSocketIO({
  debug: !(process.env.NODE_ENV === 'production'),
  connection,
  vuex: {
    store,
    actionPrefix: 'socket.',
    mutationPrefix: 'socket.',
  },
  options: {
    transports: ['websocket'],
    secure: true,
  },
}));
