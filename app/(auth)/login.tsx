import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4">
      <Text className="font-yuto text-2xl text-primary">癒途 Yuto</Text>
      <Text className="mt-2 font-yuto text-sm text-gray-500">
        請先登入以開始照護紀錄
      </Text>
      {/* 這裡之後放帳號密碼欄位、登入按鈕 */}
    </SafeAreaView>
  );
}
