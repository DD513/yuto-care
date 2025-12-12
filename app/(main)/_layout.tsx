import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../../src/components/navigation/TabBarIcon";
import { useTheme } from "../../src/hooks/useTheme";

export default function MainLayout() {
  const { colorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // label 我們自己畫在 TabBarIcon 裡
        tabBarActiveTintColor: colorScheme === "dark" ? "#C79AEE" : "#7161ef", // primary
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#050509" : "#F8F8F8", // 根據主題設置背景顏色
          borderTopColor: colorScheme === "dark" ? "#27272F" : "#E5E7EB", // 根據主題設置邊框顏色
          height: 80,
          paddingTop: 16,
          paddingBottom: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首頁",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              activeName="home" // 實心
              inactiveName="home-outline" // 空心
              label="首頁"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "動態",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              activeName="albums" // 實心
              inactiveName="albums-outline" // 空心
              label="動態"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "通知",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              activeName="notifications" // 實心
              inactiveName="notifications-outline" // 空心
              label="通知"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="member"
        options={{
          title: "會員",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              activeName="person-circle" // 實心
              inactiveName="person-circle-outline" // 空心
              label="會員"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
