import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";

export function Header({
  title,
  showBackButton = true, // 預設顯示返回按鈕
}: {
  title: string;
  showBackButton?: boolean;
}) {
  const { colorScheme } = useTheme();

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {showBackButton && (
        <Pressable
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-full active:opacity-70"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={colorScheme === "dark" ? "#F9FAFB" : "#111827"}
          />
        </Pressable>
      )}

      {/* 使標題居中，無論是否顯示返回按鈕 */}
      <Text
        className={`font-chineseBold text-xl font-semibold text-text-light dark:text-text-dark ${
          showBackButton ? "" : "flex-1 text-center"
        }`}
      >
        {title}
      </Text>

      {/* 如果沒有顯示返回按鈕，右側不佔位 */}
      {showBackButton && <View className="h-9 w-9" />}
    </View>
  );
}
