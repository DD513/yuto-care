import { Stack } from "expo-router";
import { Header } from "../../../src/components/navigation/Header";

export default function MemberLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="theme" options={{ title: "主題設置" }} />
      {/* <Stack.Screen name="profile" options={{ title: "個人資料" }} />
      <Stack.Screen name="settings" options={{ title: "設定" }} /> */}
    </Stack>
  );
}
