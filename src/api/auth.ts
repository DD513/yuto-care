import { api } from "@/api/client";
import { tokenStorage } from "@/api/tokenStorage";
import { ENV } from "@/config/env";
import { mockUser } from "@/shared/mocks/user";

export type User = typeof mockUser;

type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  user: User;
};

function computeExpiresAt(expiresInSec?: number) {
  if (!expiresInSec) return undefined;
  return Date.now() + Math.max(0, expiresInSec - 30) * 1000;
}

export const authApi = {
  async login(payload: { account: string; password: string }) {
    // 開發環境下使用 mock
    if (ENV.useMockApi) {
      await tokenStorage.set({
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
        expiresAt: computeExpiresAt(60 * 60),
      });

      return mockUser;
    }

    // 正式環境呼叫後端
    const res = await api.post<LoginResponse>("/auth/login", payload);

    await tokenStorage.set({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      expiresAt: computeExpiresAt(res.data.expiresIn),
    });

    return res.data.user;
  },

  async getCurrentUser() {
    if (ENV.useMockApi) return mockUser;

    const res = await api.get<{ user: User }>("/user");
    return res.data.user;
  },

  async logout() {
    // 如果你後端有 /auth/logout，也可以順便通知後端撤銷 refresh token
    await tokenStorage.clear();
  },
};
