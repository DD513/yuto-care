import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MemberScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4">
      <Text className="text-base font-semibold text-gray-800">會員中心</Text>
      <Text className="mt-2 text-sm text-gray-500">
        之後會放：個人資料、所屬醫院與部門、帳號設定、登出等。
      </Text>
    </SafeAreaView>
  );
}
