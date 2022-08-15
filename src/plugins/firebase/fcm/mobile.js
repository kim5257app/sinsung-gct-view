let fcmToken = null;

// NOTE: Mobile isn't supported
const PushNotifications = {};
const FCM = {};

if (window.androidBridge != null) {
  PushNotifications.addListener('registration', ({ value }) => {
    fcmToken = value;
  });
}

export default {
  requestPermissions: PushNotifications.requestPermissions,
  permission: () => null,
  register: PushNotifications.register,
  createChannel: PushNotifications.createChannel,
  deleteChannel: PushNotifications.deleteChannel,
  onPushNotificationReceived: (cb) => PushNotifications.addListener('pushNotificationReceived', cb),
  onPushNotificationActionPerformed: (cb) => PushNotifications.addListener('pushNotificationActionPerformed', cb),
  onRegistration: (cb) => PushNotifications.addListener('registration', cb),
  onRegistrationError: (cb) => PushNotifications.addListener('registrationError', cb),
  async getFCMToken() {
    return fcmToken;
  },
  setAutoInit: FCM.setAutoInit,
};
