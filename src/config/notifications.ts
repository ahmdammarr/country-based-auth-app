import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotificationIOS.requestPermissions().then(permissions => {
  console.log('permissions', permissions);
});
PushNotificationIOS.requestPermissions().then(({alert, badge, sound}) => {
  if (alert || badge || sound) {
    console.log('Notification permissions granted.');
  } else {
    console.log('Notification permissions denied.');
  }
});

export const triggerNotification = () => {
  PushNotificationIOS.addNotificationRequest({
    id: 'manual-trigger-notification',
    title: 'Welcome to the app',

    sound: 'default',
  });
};
