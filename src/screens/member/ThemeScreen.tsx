import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeScreen() {
  const { theme, colorScheme, setTheme } = useTheme();

  const options = [
    { key: "system" as const, label: "跟隨系統", desc: "依照裝置外觀自動切換" },
    { key: "light" as const, label: "淺色主題", desc: "適合明亮環境使用" },
    { key: "dark" as const, label: "深色主題", desc: "夜間閱讀更舒適" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg-app-light dark:bg-bg-app-dark">
      {/* 自訂上方標題列 */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-full active:opacity-70"
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={colorScheme === "dark" ? "#F9FAFB" : "#111827"}
          />
        </Pressable>

        <Text className="text-base font-semibold text-gray-900 dark:text-gray-50">
          主題
        </Text>

        {/* 右邊佔位，讓標題置中 */}
        <View className="h-9 w-9" />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <View className="rounded-3xl bg-card-light dark:bg-card-dark overflow-hidden">
          {options.map((opt, index) => {
            const isSelected = theme === opt.key;
            const isLast = index === options.length - 1;

            return (
              <Pressable
                key={opt.key}
                onPress={() => setTheme(opt.key)}
                className={`flex-row items-center justify-between px-4 py-3 ${
                  !isLast
                    ? "border-b border-border-subtle-light dark:border-border-subtle-dark"
                    : ""
                }`}
              >
                <View className="flex-1">
                  <Text className="text-sm text-text-main-light dark:text-text-main-dark">
                    {opt.label}
                  </Text>
                  <Text className="mt-0.5 text-xs text-text-subtle-light dark:text-text-subtle-dark">
                    {opt.desc}
                  </Text>
                </View>

                {isSelected && (
                  <View className="ml-3 h-7 w-7 items-center justify-center rounded-full bg-primary/15 dark:bg-primary/25">
                    <Ionicons name="checkmark" size={16} color="#C79AEE" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
