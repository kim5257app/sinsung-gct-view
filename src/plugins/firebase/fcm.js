import fcmWeb from './fcm/web';
import fcmMobile from './fcm/mobile';

let initialized = false;

function isSupported() {
  return (window.androidBridge != null);
}

export default {
  async requestPermissions() {
    return (!isSupported())
      ? fcmWeb.requestPermissions()
      : fcmMobile.requestPermissions();
  },
  async permission() {
    return (!isSupported())
      ? fcmWeb.permission()
      : fcmMobile.permission();
  },
  async register() {
    return (!isSupported())
      ? fcmWeb.register()
      : fcmMobile.register();
  },
  async getFCMToken() {
    return (!isSupported())
      ? fcmWeb.getFCMToken()
      : fcmMobile.getFCMToken();
  },
  async initialize() {
    console.log('isSupported:', isSupported());

    if (!initialized) {
      const fcm = (!isSupported()) ? fcmWeb : fcmMobile;

      await fcm.setAutoInit({ enabled: true });

      await fcm.createChannel({
        id: 'DEFAULT_CHANNEL',
        name: '기본 알림 채널',
        importance: 3,
      });
      await fcm.createChannel({
        id: 'NO_SOUND_CHANNEL',
        name: '무음 알림 채널',
        importance: 2,
      });

      await fcm.onRegistration((data) => {
        console.log('onRegistration:', data);
      });

      await fcm.onRegistrationError((data) => {
        console.log('onRegistrationError:', data);
      });

      await fcm.onPushNotificationReceived((payload) => {
        console.log('onReceived:', JSON.stringify(payload));
      });

      await fcm.onPushNotificationActionPerformed((data) => {
        console.log('onActionPerformed:', data);
      });

      await fcm.register();

      initialized = true;
    }
  },
};
