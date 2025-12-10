import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      {/* Header：平台名稱 + Slogan */}
      <View className="border-b border-border-light dark:border-border-dark px-4 pt-6 pb-4">
        <Text className="font-englishTitle text-2xl font-semibold text-primary">
          Yuto
        </Text>
        <Text className="mt-1 text-sm text-text-subtle-light dark:text-text-subtle-dark">
          陪你走完每一段照護旅程
        </Text>
      </View>

      {/* 使用者帳號資訊區塊 */}
      <View className="border-b border-border-light dark:border-border-dark px-4 py-3">
        <Text className="text-base text-text-light dark:text-text-dark">
          目前登入身分
        </Text>
        <Text className="mt-1 text-base font-medium text-text-light dark:text-text-dark">
          王小玲 護理師｜護理部 5C 病房
        </Text>
        <Text className="mt-0.5 text-xs text-text-subtle-light dark:text-text-subtle-dark">
          Nurse ID：N-10327
        </Text>
      </View>

      {/* 今日待辦（之後會放：需要紀錄／追蹤傷口的病人） */}
      <View className="flex-1 px-4 py-4">
        <Text className="mb-2 text-base font-semibold text-text-light dark:text-text-dark">
          今日待辦任務
        </Text>
        <Text className="text-sm text--text-subtle-light dark:text-text-subtle-dark">
          這裡之後會顯示：即將到期的傷口評估、需要追蹤的病人清單。
        </Text>
      </View>
    </SafeAreaView>
  );
}
