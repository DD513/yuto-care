import React from "react";
import { View, Text } from "react-native";
import type { HomeUser } from "../types";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "早安";
  if (hour < 17) return "午安";
  return "晚安";
}

type Props = {
  user: HomeUser;
};

export const HomeUserIntro: React.FC<Props> = ({ user }) => {
  const greeting = getGreeting();

  return (
    <View className="px-6 pb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="font-chineseBold mt-1 text-2xl text-text-light dark:text-text-dark">
            {greeting}，{user.name}
          </Text>
          <Text className="font-chineseRegular mt-1 text-sm text-text-subtle-light dark:text-text-subtle-dark">
            {user.role} · {user.unit}
          </Text>
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-full bg-secondary/40 dark:bg-secondary/80">
          <Text className="font-chineseBold text-base text-text-light dark:text-text-dark">
            {user.name[0]}
          </Text>
        </View>
      </View>
    </View>
  );
};
