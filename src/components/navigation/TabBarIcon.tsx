import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Props = {
  label: string;
  activeName: IconName; // 選中時的 icon（實心）
  inactiveName: IconName; // 未選中時的 icon（空心）
  focused: boolean;
  color: string;
};

export function TabBarIcon({
  label,
  activeName,
  inactiveName,
  focused,
  color,
}: Props) {
  const iconName = focused ? activeName : inactiveName;

  return (
    <View className="items-center justify-center">
      <Ionicons name={iconName} size={24} color={color} />

      <Text
        className={`mt-1 text-xs ${
          focused ? "font-semibold text-primary" : "text-gray-400"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}
