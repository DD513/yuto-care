import "../global.css"; // ✅ 在這裡 import Tailwind / NativeWind 的 CSS

import React from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { YutoThemeProvider } from "../src/contexts/ThemeProvider";

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
    <YutoThemeProvider>
      <SafeAreaProvider>
        {/* Slot = 在這個 layout 底下的子 route */}
        <Slot />
      </SafeAreaProvider>
    </YutoThemeProvider>
  );
}
