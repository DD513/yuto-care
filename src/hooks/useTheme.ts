import { useContext } from "react";
import { YutoThemeContext } from "../contexts/ThemeProvider";

// ✅ 抽成 hook：在任何 component 裡用 useYutoTheme()
export function useTheme() {
  const ctx = useContext(YutoThemeContext);
  if (!ctx) {
    throw new Error("useYutoTheme 必須包在 <YutoThemeProvider> 裡面使用");
  }
  return ctx;
}
