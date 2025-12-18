import React from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { Header } from "../../components/navigation/Header";
import { useAuth } from "@/contexts/AuthProvider";

export default function MemberScreen() {
  const { theme, colorScheme } = useTheme();
  const { user, logout } = useAuth();

  const themeLabel =
    theme === "system"
      ? `跟隨系統（${colorScheme === "dark" ? "深色" : "淺色"}）`
      : theme === "dark"
        ? "深色主題"
        : "淺色主題";

  const initial = user?.name?.trim()?.[0] ?? "？";

  const onLogout = () => {
    Alert.alert("登出", "確定要登出嗎？", [
      { text: "取消", style: "cancel" },
      {
        text: "登出",
        style: "destructive",
        onPress: async () => {
          await logout(); // ✅ 會清 token（authApi.logout -> tokenStorage.clear）
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      <Header title="會員中心" showBackButton={false} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
      >
        {/* 會員中心頭部 */}
        <Text className="font-chineseBold text-base font-semibold text-text-light dark:text-text-dark">
          會員中心
        </Text>
        <Text className="font-chineseRegular mt-2 text-sm text-text-subtle-light dark:text-text-subtle-dark">
          之後會放：個人資料、所屬醫院與部門、帳號設定、登出等。
        </Text>

        {/* ✅ 使用者資訊卡 */}
        <View className="mt-6 rounded-3xl bg-surface-light dark:bg-surface-dark overflow-hidden px-4 py-4">
          <View className="flex-row items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-secondary/40 dark:bg-secondary/80">
              <Text className="font-chineseBold text-lg text-text-light dark:text-text-dark">
                {initial}
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="font-chineseBold text-base text-text-light dark:text-text-dark">
                {user?.name ?? "未登入"}
              </Text>
              <Text className="font-chineseRegular mt-1 text-sm text-text-subtle-light dark:text-text-subtle-dark">
                {user?.role ?? "—"} · {user?.unit ?? "—"}
              </Text>
            </View>
          </View>
        </View>

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
                <Text className="font-chineseRegular text-base text-text-light dark:text-text-dark">
                  主題
                </Text>
                {/* <Text className="font-chineseRegularmt-0.5 text-xs text-text-subtle-light dark:text-text-subtle-dark">
                  {themeLabel}
                </Text> */}
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colorScheme === "dark" ? "#9CA3AF" : "#9CA3AF"}
            />
          </Pressable>
        </View>

        {/* ✅ 登出按鈕 */}
        <Pressable
          onPress={onLogout}
          className="mt-6 rounded-2xl bg-red-500/10 dark:bg-red-400/15 px-4 py-3 items-center"
        >
          <Text className="font-chineseBold text-base text-red-600 dark:text-red-300">
            登出
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
