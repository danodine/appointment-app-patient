import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
} from "../utils/notificationHelpers";

export default function NotificationSetup() {
  const user = useSelector((state) => state.auth.user);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (user && user._id) {
      console.log(
        "User logged in, setting up notifications for user ID:",
        user._id
      );
      registerForPushNotificationsAsync(user._id);

      const cleanupListeners = setupNotificationListeners();

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification received:", notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("Notification tapped:", response);
          const { data } = response.notification.request.content;
          if (data?.appointmentId) {
            console.log("Navigate to appointment ID:", data.appointmentId);
            // You can now navigate
          }
        });

      return () => {
        console.log("Cleaning up notification listeners");
        cleanupListeners();
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    } else {
      console.log("User not logged in, skipping notification setup.");
    }
  }, [user]);
  console.log(
    "🔍 Available keys in Notifications:",
    Object.keys(Notifications)
  );

  return null;
}
