import "../global.css"; // ✅ 在這裡 import Tailwind / NativeWind 的 CSS

import React from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { YutoThemeProvider } from "@/contexts/ThemeProvider";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // key 名是之後在 fontFamily 要用到的字串
    YutoEnglishTitleRegular: require("../assets/fonts/LilitaOne-Regular.ttf"),
    ChineseRegular: require("../assets/fonts/LINESeedTW_TTF_Rg.ttf"),
    ChineseBold: require("../assets/fonts/LINESeedTW_TTF_Bd.ttf"),
    EnglishRegular: require("../assets/fonts/LINESeedSans_A_Rg.ttf"),
    EnglishBold: require("../assets/fonts/LINESeedSans_A_Bd.ttf"),
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
