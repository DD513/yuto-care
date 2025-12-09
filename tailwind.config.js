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
        primary: "#C79AEE",
        secondary: "#FFD972",

        // App 背景
        "bg-app-light": "#F5F5F7", // 淺色整體背景
        "bg-app-dark": "#050509", // 深色整體背景（接近 Mymory 那種）

        // 卡片 / 區塊
        "card-light": "#FFFFFF",
        "card-dark": "#111111",

        // 文字
        "text-main-light": "#111827",
        "text-main-dark": "#F9FAFB",
        "text-subtle-light": "#6B7280",
        "text-subtle-dark": "#9CA3AF",

        // 邊線
        "border-subtle-light": "#E5E7EB",
        "border-subtle-dark": "#27272F",
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
