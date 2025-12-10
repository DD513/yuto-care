/** @type {import('tailwindcss').Config} */
module.exports = {
  // ⚠️ 記得改成你實際會放畫面的路徑
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  // NativeWind v4 關鍵：要加上它的 preset
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 品牌色（不分主題）
        primary: {
          DEFAULT: "#C79AEE",
          dark: "#A67DD4", // 深色模式下稍微調暗
        },
        secondary: {
          DEFAULT: "#FFD972",
          dark: "#E6C35E",
        },

        // App 背景
        bg: {
          light: "#F8F8F8",
          dark: "#050509",
        },

        // 卡片 / 區塊
        surface: {
          // 卡片/容器背景
          light: "#FFFFFF",
          dark: "#111111",
        },
        elevated: {
          // 浮起的元素（如 modal、dropdown）
          light: "#FFFFFF",
          dark: "#1A1A1A",
        },

        // 文字
        text: {
          light: "#111827",
          dark: "#F9FAFB",
          "subtle-light": "#6B7280",
          "subtle-dark": "#9CA3AF",
        },

        // 邊框/分隔線
        border: {
          light: "#E5E7EB",
          dark: "#27272F",
        },
        divider: {
          // 分隔線（更細的邊框）
          light: "#F3F4F6",
          dark: "#1F1F23",
        },
      },
      fontFamily: {
        // 這裡的 'yuto' 是 Tailwind 用的 key
        // 陣列裡第一個字串要跟 useFonts 的 key 一樣
        englishTitle: ["YutoEnglishTitleRegular", "System"],
      },
    },
  },
  plugins: [],
};
