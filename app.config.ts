import "dotenv/config";
import type { ExpoConfig, ConfigContext } from "expo/config";

type AppEnv = "development" | "staging" | "production";
const appEnv = (process.env.APP_ENV ?? "development") as AppEnv;

const nameMap: Record<AppEnv, string> = {
  development: "Yuto (Dev)",
  staging: "Yuto (Stg)",
  production: "Yuto",
};

const bundleIdMap: Record<AppEnv, string> = {
  development: "com.airic.yuto.dev",
  staging: "com.airic.yuto.stg",
  production: "com.airic.Yuto",
};

const androidPackageMap: Record<AppEnv, string> = {
  development: "com.airic.yuto.dev",
  staging: "com.airic.yuto.stg",
  production: "com.airic.Yuto",
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: nameMap[appEnv],
  slug: "Yuto",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/yuto-logo.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: bundleIdMap[appEnv],
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: androidPackageMap[appEnv],
  },
  web: {
    bundler: "metro",
  },
  scheme: "yuto",
  plugins: ["expo-router"],

  // ✅ App 端可讀取的「非機密」設定
  extra: {
    APP_ENV: appEnv,
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  },
});
