import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { Header } from "../../components/navigation/Header";

export default function MemberScreen() {
  const { theme, colorScheme } = useTheme();

  const themeLabel =
    theme === "system"
      ? `跟隨系統（${colorScheme === "dark" ? "深色" : "淺色"}）`
      : theme === "dark"
        ? "深色主題"
        : "淺色主題";

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      <Header title="會員中心" showBackButton={false} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
      >
        {/* 會員中心頭部 */}
        <Text className="text-base font-semibold text-text-light dark:text-text-dark">
          會員中心
        </Text>
        <Text className="mt-2 text-sm text-text-subtle-light dark:text-text-subtle-dark">
          之後會放：個人資料、所屬醫院與部門、帳號設定、登出等。
        </Text>

        {/* 設定卡片（簡化版，可以慢慢加其他項目） */}
        <View className="mt-6 rounded-3xl bg-surface-light dark:bg-surface-dark overflow-hidden">
          {/* 主題列 */}
          <Pressable
            onPress={() => router.push("/(main)/member/theme")}
            className="flex-row items-center justify-between px-4 py-3"
          >
            <View className="flex-row items-center gap-x-3">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-primary/15 dark:bg-primary/25">
                <Ionicons
                  name="color-palette-outline"
                  size={18}
                  color={colorScheme === "dark" ? "#F9FAFB" : "#4B5563"}
                />
              </View>
              <View>
                <Text className="text-sm text-text-light dark:text-text-dark">
                  主題
                </Text>
                <Text className="mt-0.5 text-xs text-text-subtle-light dark:text-text-subtle-dark">
                  {themeLabel}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colorScheme === "dark" ? "#9CA3AF" : "#9CA3AF"}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
