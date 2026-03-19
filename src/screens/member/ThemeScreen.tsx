import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Header } from "@/components/navigation/Header";

export default function ThemeScreen() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      key: "system" as const,
      label: "跟隨系統",
      desc: "依照裝置外觀自動切換",
    },
    {
      key: "light" as const,
      label: "淺色主題",
      desc: "適合明亮環境使用",
    },
    {
      key: "dark" as const,
      label: "深色主題",
      desc: "夜間閱讀更舒適",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      <Header title="主題" showBackButton={true} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <View className="overflow-hidden rounded-3xl bg-surface-light dark:bg-surface-dark">
          {options.map((opt, index) => {
            const isSelected = theme === opt.key;
            const isLast = index === options.length - 1;

            return (
              <Pressable
                key={opt.key}
                testID={`theme-option-${opt.key}`}
                accessibilityRole="button"
                accessibilityLabel={`theme-option-${opt.key}`}
                onPress={() => setTheme(opt.key)}
                className={`flex-row items-center justify-between px-4 py-3 ${
                  !isLast
                    ? "border-b border-border-light dark:border-border-dark"
                    : ""
                }`}
              >
                <View className="flex-1">
                  <Text className="font-chineseRegular text-base text-text-light dark:text-text-dark">
                    {opt.label}
                  </Text>
                  <Text className="mt-0.5 font-chineseRegular text-xs text-text-subtle-light dark:text-text-subtle-dark">
                    {opt.desc}
                  </Text>
                </View>

                {isSelected ? (
                  <View testID={`theme-check-${opt.key}`}>
                    <Ionicons name="checkmark" size={20} color="#C79AEE" />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
