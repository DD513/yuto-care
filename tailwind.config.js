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
        primary: "#A38CFF",
        secondary: "#FFD972",
        background: "#F5FBFF",
      },
    },
  },
  plugins: [],
};
