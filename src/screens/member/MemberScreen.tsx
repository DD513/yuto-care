import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, selectUser } from "@/features/auth/authSlice";

import { Header } from "@/components/navigation/Header";
import { ListRow } from "@/components/ui/ListRow";
import { Avatar } from "@/components/ui/Avatar";
import { ListGroup } from "@/components/ui/ListGroup";

export default function MemberScreen() {
  const { theme, colorScheme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const themeLabel =
    theme === "system"
      ? `跟隨系統（${colorScheme === "dark" ? "深色" : "淺色"}）`
      : theme === "dark"
        ? "深色"
        : "淺色";

  const onLogout = () => {
    Alert.alert("登出", "確定要登出嗎？", [
      { text: "取消", style: "cancel" },
      {
        text: "登出",
        style: "destructive",
        onPress: async () => {
          await dispatch(logout()).unwrap();
          router.replace("/(auth)/login"); // （RouteGuard 也會處理）
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-bg-light dark:bg-bg-dark"
      edges={["top"]}
    >
      <Header title="個人" showBackButton={false} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
      >
        {/* ✅ Profile Card（仿照你給的「頭像 + 名字 + 次要資訊」卡片） */}
        <ListGroup>
          <View className="flex-row items-center px-4 py-4">
            <Avatar
              name={user?.name}
              size={48}
              uri={user?.uri}
              className="bg-bg-light/70 dark:bg-bg-dark/60"
            />
            <View className="ml-4 flex-1">
              <Text className="font-chineseBold text-lg text-text-light dark:text-text-dark">
                {user?.name ?? "未登入"}
              </Text>
              <Text className="mt-1 font-chineseRegular text-sm text-text-subtle-light dark:text-text-subtle-dark">
                {(user?.role ?? "—") + " · " + (user?.unit ?? "—")}
              </Text>
            </View>
          </View>
        </ListGroup>

        {/* ✅ Section title */}
        <Text className="mt-6 mb-2 px-1 font-chineseRegular text-base text-text-subtle-light dark:text-text-subtle-dark">
          偏好
        </Text>

        {/* ✅ Settings Card（仿照你給的「一張卡多列」） */}
        <ListGroup className="mt-0">
          <ListRow
            testID="member-theme-row"
            iconName="color-palette-outline"
            label="主題"
            value={themeLabel}
            onPress={() => router.push("/(main)/member/theme")}
          />
          <ListRow
            testID="member-notifications-row"
            iconName="notifications-outline"
            label="通知"
            onPress={() => {
              // TODO: router.push("/(main)/member/notifications-settings")
            }}
          />
          <ListRow
            testID="member-lock-row"
            iconName="lock-closed-outline"
            label="鎖定螢幕"
            onPress={() => {
              // TODO
            }}
            isLast
          />
        </ListGroup>

        {/* ✅ 其他 */}
        <ListGroup className="mt-6">
          <ListRow
            testID="member-review-row"
            iconName="star-outline"
            label="寫評價"
            onPress={() => {
              // TODO: App Store / Play Store deep link
            }}
          />
          <ListRow
            testID="member-support-row"
            iconName="help-circle-outline"
            label="Yuto 支援"
            onPress={() => {
              // TODO
            }}
          />
          <ListRow
            testID="member-app-info-row"
            iconName="information-circle-outline"
            label="App 資訊"
            onPress={() => {
              // TODO
            }}
          />
          <ListRow
            testID="member-account-row"
            iconName="person-outline"
            label="帳號"
            onPress={() => {
              // TODO: router.push("/(main)/member/account")
            }}
            isLast
          />
        </ListGroup>

        {/* ✅ Logout（放在卡片列的風格，跟截圖一致） */}
        <ListGroup className="mt-6">
          <ListRow
            testID="member-logout-row"
            iconName="log-out-outline"
            label="登出"
            onPress={onLogout}
            danger
            showChevron={false}
            isLast
          />
        </ListGroup>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
