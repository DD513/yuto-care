import * as SecureStore from "expo-secure-store";

export type JwtTokens = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number; // epoch ms
};

const KEY = "yuto.jwt.tokens";

export const tokenStorage = {
  async get(): Promise<JwtTokens | null> {
    const raw = await SecureStore.getItemAsync(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as JwtTokens;
    } catch {
      return null;
    }
  },
  async set(tokens: JwtTokens) {
    await SecureStore.setItemAsync(KEY, JSON.stringify(tokens));
  },
  async clear() {
    await SecureStore.deleteItemAsync(KEY);
  },
};
