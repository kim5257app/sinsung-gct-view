import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAN0Ppro5QXUc_7t-BvHWCaxpMO6Il_FGU',
  authDomain: 'sinsung-gct.firebaseapp.com',
  projectId: 'sinsung-gct',
  storageBucket: 'sinsung-gct.appspot.com',
  messagingSenderId: '909391103952',
  appId: '1:909391103952:web:8e5f5296734d605a31dbd5',
  measurementId: 'G-5KK29ZK7RV',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {
  app,
  analytics,
};
