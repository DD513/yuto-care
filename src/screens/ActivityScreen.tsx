import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActivityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark px-4 py-4">
      <Text className="text-base font-semibold text-text-light dark:text-text-dark">
        動態
      </Text>
      <Text className="mt-2 text-sm text-text-subtle-light dark:text-text-subtle-dark">
        之後會顯示：我有權限看到的所有病人最新傷口紀錄與變化。
      </Text>
    </SafeAreaView>
  );
}
