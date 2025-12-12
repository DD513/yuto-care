import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark px-4 py-4">
      <Text className="font-chineseBold text-base font-semibold text-text-light dark:text-text-dark">
        通知
      </Text>
      <Text className="font-chineseRegular mt-2 text-sm text-text-subtle-light dark:text-text-subtle-dark">
        這裡之後會顯示：系統通知、病人通知、風險警示。
      </Text>
    </SafeAreaView>
  );
}
