import '../../firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const vapidKey = 'BDQN0xAuKUr5zS-s384btdeRLygq0a8WGwRoPm8z-LK3Y3lHYFgNCPPL1NvUw3nHuaRR74PxDgreN4LCG4tucGk';

// Initialize Firebase
const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log('message received:', payload);
});

export default {
  requestPermissions: async () => (Notification.requestPermission()),
  permission: () => (Notification.permission),
  register: () => {},
  createChannel: () => {},
  deleteChannel: () => {},
  onPushNotificationReceived: () => {},
  onPushNotificationActionPerformed: () => {},
  onRegistration: () => {},
  onRegistrationError: () => {},
  async getFCMToken() {
    return getToken(messaging, { vapidKey });
  },
  setAutoInit: () => {},
};
