import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { WoundModel } from "../types";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/colors";

type Props = {
  models: WoundModel[];
};

export const HomeWoundModelsSection: React.FC<Props> = ({ models }) => {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];
  return (
    <View className="mt-6 px-6">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-chineseBold text-xl text-text-light dark:text-text-dark">
          傷口評估模型
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="font-englishRegular text-xs text-text-subtle-light dark:text-text-subtle-dark">
            管理模型
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 24,
          paddingLeft: 8,
        }}
      >
        {models.map((model) => (
          <Pressable
            key={model.id}
            className="mr-4 w-64 rounded-3xl bg-elevated-light px-4 py-6 active:opacity-90 dark:bg-elevated-dark"
          >
            <View className="mb-2 flex-row items-center justify-between">
              <View className="rounded-full bg-primary/15 px-2 py-0.5">
                <Text className="font-englishRegular text-[10px] text-primary dark:text-primary-dark">
                  {model.tag}
                </Text>
              </View>
              <Ionicons
                name="sparkles-outline"
                size={16}
                color={colors.secondary}
              />
            </View>

            <Text className="font-chineseBold text-base text-text-light dark:text-text-dark">
              {model.title}
            </Text>
            <Text className="font-chineseRegular mt-1 text-xs text-text-subtle-light dark:text-text-subtle-dark">
              {model.desc}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};
