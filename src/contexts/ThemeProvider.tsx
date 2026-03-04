import React, { createContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme as nativeWindColorScheme } from "nativewind";

type ThemeMode = "system" | "light" | "dark";
type Scheme = "light" | "dark";

type YutoThemeContextValue = {
  theme: ThemeMode;
  colorScheme: Scheme;
  setTheme: (mode: ThemeMode) => void;
};

export const YutoThemeContext = createContext<
  YutoThemeContextValue | undefined
>(undefined);

const STORAGE_KEY = "yuto-theme-mode";

export const YutoThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [isThemeReady, setIsThemeReady] = useState(false);

  // ✅ 永遠追蹤「系統」目前的顏色（避免切換瞬間拿到舊值）
  const [systemScheme, setSystemScheme] = useState<Scheme>(
    (Appearance.getColorScheme() ?? "light") as Scheme,
  );

  // 1) 啟動讀取設定
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

  // 2) 設定變更寫回
  useEffect(() => {
    if (!isThemeReady) return;
    AsyncStorage.setItem(STORAGE_KEY, theme).catch(() => {});
  }, [theme, isThemeReady]);

  // 3) 永遠監聽系統變化，更新 systemScheme（不管你是不是 system 模式都更新）
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme((colorScheme ?? "light") as Scheme);
    });
    return () => sub.remove();
  }, []);

  // 4) 真正套用到畫面的 scheme（唯一來源）
  const resolvedScheme: Scheme = theme === "system" ? systemScheme : theme;
  // console.log("theme ->", theme);
  // console.log("Appearance.getColorScheme()", Appearance.getColorScheme());
  // console.log("systemScheme state", systemScheme);
  // console.log("resolvedScheme", resolvedScheme);

  // 5) 同步給 NativeWind（dark: 立即生效）
  useEffect(() => {
    if (theme === "system") {
      nativeWindColorScheme.set("system");

      // 立刻抓一次最新系統值，減少延遲造成的「先顯示上一個顏色」
      setSystemScheme((Appearance.getColorScheme() ?? "light") as Scheme);
    } else {
      nativeWindColorScheme.set(theme);
    }
  }, [theme]);

  const value = useMemo<YutoThemeContextValue>(() => {
    return { theme, colorScheme: resolvedScheme, setTheme };
  }, [theme, resolvedScheme]);

  if (!isThemeReady) return null;

  return (
    <YutoThemeContext.Provider value={value}>
      {children}
    </YutoThemeContext.Provider>
  );
};
