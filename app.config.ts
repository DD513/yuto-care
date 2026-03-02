import * as path from "path";
import dotenv from "dotenv";
import type { ExpoConfig, ConfigContext } from "expo/config";

type AppEnv = "development" | "staging" | "production";
const rawEnv = process.env.APP_ENV ?? "development";
const appEnv: AppEnv = (["development", "staging", "production"].includes(rawEnv)
  ? rawEnv
  : "development") as AppEnv;

// 依環境載入正確的 .env 檔
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${appEnv}`),
  override: true, // 讓 staging/prod 能覆蓋掉 Expo 先載入的值
});

const nameMap: Record<AppEnv, string> = {
  development: "Yuto (Dev)",
  staging: "Yuto (Stg)",
  production: "Yuto",
};

const bundleIdMap: Record<AppEnv, string> = {
  development: "com.airic.yuto.dev",
  staging: "com.airic.yuto.stg",
  production: "com.airic.yuto",
};

const androidPackageMap: Record<AppEnv, string> = {
  development: "com.airic.yuto.dev",
  staging: "com.airic.yuto.stg",
  production: "com.airic.yuto",
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
