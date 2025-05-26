// You might need to import your configured axios instance
import axiosInstance from './axiosInstance'; // Adjust the path as needed
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Set up notification handler for when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync(userId) {
  let token;

  // Check if running on a physical device
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask if permissions have not already been determined
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    // Get the Expo push token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    // Send the token to your backend
    try {
      // Replace '/api/v1/users/updateExpoPushToken' with your actual backend endpoint
      // and ensure axiosInstance is correctly configured with your backend URL
      await axiosInstance.patch(`http://192.168.0.63:3000/api/v1/users/updateExpoPushToken`, { token });
      console.log('Push token sent to backend successfully');
    } catch (error) {
      console.error('Error sending push token to backend:', error);
      // Handle errors, e.g., show an alert to the user
    }

  } else {
    alert('Must use physical device for Push Notifications');
  }

  // Return the token if needed, though sending to backend is the primary goal here
  return token;
}

// You can also set up listeners for receiving notifications
export function setupNotificationListeners() {
  // Listener for when a notification is received while the app is in the foreground
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
    // You can update UI or state based on the received notification
  });

  // Listener for when a user taps on a notification
  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification tapped:', response);
    // You can navigate the user to a specific screen based on the notification data
    const { data } = response.notification.request.content;
    if (data?.appointmentId) {
      console.log('Navigate to appointment details for ID:', data.appointmentId);
      // Example navigation (requires access to navigation object)
      // navigation.navigate('AppointmentDetailScreen', { appointmentId: data.appointmentId });
    }
  });

  // Clean up listeners when the component unmounts
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}
