import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AndroidNotificationPriority } from "expo-notifications";
export const NOTIFICATION_KEY = "MobileFlashCards:notifications";

// Notification content
function createNotifications() {
  return {
    title: " Quiz reminder ",
    body: "🧠 Don't forget to feed your brain today!",

    // Android-specific fields
    sound: true,
    priority: AndroidNotificationPriority.HIGH,
    sticky: false,
  };
}

// repeat notification daily at 18 o'clock
function schedulingOptions() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  return {
    time: tomorrow,
    repeats: "day",
  };
}

// Notification content
export async function setLocalNotifications() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            // schedule notification for tomorrow at 18 o'clock
            Notifications.scheduleNotificationAsync(
              createNotifications,
              schedulingOptions
            );
          }

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        });
      }
    });
}

// clear notification
export function clearNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
