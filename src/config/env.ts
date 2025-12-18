import Constants from "expo-constants";

type Extra = {
  APP_ENV?: string;
  API_BASE_URL?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

export const ENV = {
  appEnv: extra.APP_ENV ?? "development",
  apiBaseUrl: extra.API_BASE_URL ?? "",
  useMockApi: (extra.APP_ENV ?? "development") === "development",
} as const;