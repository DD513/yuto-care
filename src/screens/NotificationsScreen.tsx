import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4">
      <Text className="text-base font-semibold text-gray-800">通知</Text>
      <Text className="mt-2 text-sm text-gray-500">
        這裡之後會顯示：系統通知、病人通知、風險警示。
      </Text>
    </SafeAreaView>
  );
}
