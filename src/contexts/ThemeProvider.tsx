import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme as nativeWindColorScheme } from "nativewind";

type ThemeMode = "system" | "light" | "dark";

type YutoThemeContextValue = {
  theme: ThemeMode; // 使用者選的：system / light / dark
  colorScheme: "light" | "dark"; // 真正套用到畫面的：light / dark
  setTheme: (mode: ThemeMode) => void;
};

export const YutoThemeContext = createContext<
  YutoThemeContextValue | undefined
>(undefined);

const STORAGE_KEY = "yuto-theme-mode";

export const YutoThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceScheme = useDeviceColorScheme() ?? "light"; // 手機系統目前的深淺
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [isThemeReady, setIsThemeReady] = useState(false);

  // 轉成真正要給畫面用的 light / dark
  const resolvedScheme: "light" | "dark" =
    theme === "system" ? deviceScheme : theme;

  // 啟動時從 AsyncStorage 把主題讀回來
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "system" || saved === "light" || saved === "dark") {
          setTheme(saved);
        }
      } catch (e) {
        console.warn("Failed to load theme from storage", e);
      } finally {
        setIsThemeReady(true);
      }
    })();
  }, []);

  // 使用者切換主題時，寫回 AsyncStorage
  useEffect(() => {
    if (!isThemeReady) return; // 讀完之前不要寫
    AsyncStorage.setItem(STORAGE_KEY, theme).catch(() => {});
  }, [theme, isThemeReady]);

  // 🔥 最重要：同步給 NativeWind，讓 `dark:` 能正常運作
  useEffect(() => {
    nativeWindColorScheme.set(resolvedScheme);
  }, [resolvedScheme]);

  const value: YutoThemeContextValue = {
    theme,
    colorScheme: resolvedScheme,
    setTheme,
  };

  // 等主題載回來再 render，避免一啟動先閃一下預設值
  if (!isThemeReady) return null;

  return (
    <YutoThemeContext.Provider value={value}>
      {children}
    </YutoThemeContext.Provider>
  );
};
