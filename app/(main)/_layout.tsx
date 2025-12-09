import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../../src/components/navigation/TabBarIcon";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // label 我們自己畫在 TabBarIcon 裡
        // tabBarActiveTintColor: "#FFFFFF", // icon 的顏色由這裡決定
        // tabBarInactiveTintColor: "#6B7280", // tailwind 的 gray-500 左右
        tabBarActiveTintColor: "#C79AEE", // primary
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          // backgroundColor: "#000000", // Weverse 那種黑底
          // borderTopColor: "#111827", // 接近 gray-900 當上方分隔線
          height: 80,
          paddingTop: 12,
          paddingBottom: 12,
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
