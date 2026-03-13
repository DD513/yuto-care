import "../global.css"; // 在這裡 import Tailwind / NativeWind 的 CSS

import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { store } from "@/store";
import { YutoThemeProvider } from "@/contexts/ThemeProvider";
import { RouteGuard } from "@/navigation/RouteGuard";
import { bootstrapAuth, selectBootstrapped } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

function AppBootstrapGate({ isFontsReady }: { isFontsReady: boolean }) {
  const dispatch = useAppDispatch();
  const bootstrapped = useAppSelector(selectBootstrapped);

  React.useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  React.useEffect(() => {
    if (isFontsReady && bootstrapped) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isFontsReady, bootstrapped]);

  if (!isFontsReady || !bootstrapped) return null;

  return <RouteGuard />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    YutoEnglishTitleRegular: require("../assets/fonts/LilitaOne-Regular.ttf"),
    ChineseRegular: require("../assets/fonts/LINESeedTW_TTF_Rg.ttf"),
    ChineseBold: require("../assets/fonts/LINESeedTW_TTF_Bd.ttf"),
    EnglishRegular: require("../assets/fonts/LINESeedSans_A_Rg.ttf"),
    EnglishBold: require("../assets/fonts/LINESeedSans_A_Bd.ttf"),
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <YutoThemeProvider>
          <AppBootstrapGate isFontsReady={!!fontsLoaded} />
        </YutoThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
