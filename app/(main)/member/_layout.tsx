import { Stack } from "expo-router";

export default function MemberLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="profile" options={{ title: "個人資料" }} />
      <Stack.Screen name="settings" options={{ title: "設定" }} /> */}
    </Stack>
  );
}
