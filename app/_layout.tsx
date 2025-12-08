import "../global.css"; // ✅ 在這裡 import Tailwind / NativeWind 的 CSS

import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // key 名是之後在 fontFamily 要用到的字串
    YutoEnglishTitleRegular: require("../assets/fonts/LilitaOne-Regular.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // 字型還沒載入好時先維持在 Splash 畫面
    return null;
  }

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#A38CFF", // primary
          tabBarInactiveTintColor: "#9CA3AF",
        }}
      >
        <Tabs.Screen name="index" options={{ title: "首頁" }} />
        <Tabs.Screen name="activity" options={{ title: "動態" }} />
        <Tabs.Screen name="notifications" options={{ title: "通知" }} />
        <Tabs.Screen name="member" options={{ title: "會員" }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
