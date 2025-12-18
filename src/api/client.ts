import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { ENV } from "@/config/env";
import { tokenStorage } from "@/api/tokenStorage";

type RefreshResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number; // seconds
};

function computeExpiresAt(expiresInSec?: number) {
  if (!expiresInSec) return undefined;
  return Date.now() + Math.max(0, expiresInSec - 30) * 1000; // 提前 30 秒
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
const pendingQueue: Array<(token: string | null) => void> = [];

async function refreshAccessToken(api: AxiosInstance): Promise<string | null> {
  const stored = await tokenStorage.get();
  const refreshToken = stored?.refreshToken;
  if (!refreshToken) return null;

  try {
    // 使用 _skipAuthRefresh 標記，防止 refresh 請求觸發 interceptor 循環
    const res = await api.post<RefreshResponse>(
      "/auth/refresh",
      { refreshToken },
      { headers: { _skipAuthRefresh: "true" } } as any
    );
    const newAccess = res.data.accessToken;

    await tokenStorage.set({
      accessToken: newAccess,
      refreshToken: res.data.refreshToken ?? refreshToken,
      expiresAt: computeExpiresAt(res.data.expiresIn),
    });

    return newAccess;
  } catch {
    await tokenStorage.clear();
    return null;
  }
}

export function createApiClient() {
  const api = axios.create({
    baseURL: ENV.apiBaseUrl,
    timeout: 20000,
  });

  api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const jwt = await tokenStorage.get();
    if (jwt?.accessToken) config.headers.Authorization = `Bearer ${jwt.accessToken}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      if (!error.response) return Promise.reject(error);

      const status = error.response.status;
      const original = error.config as AxiosRequestConfig & { _retry?: boolean };
      const skipRefresh = (original.headers as any)?._skipAuthRefresh === "true";

      // 如果是 401 且非重試請求且非 refresh 請求本身
      if (status === 401 && !original._retry && !skipRefresh) {
        original._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken(api).finally(() => {
            isRefreshing = false;
          });

          const newToken = await refreshPromise;
          pendingQueue.splice(0).forEach((cb) => cb(newToken));
          refreshPromise = null;

          if (!newToken) return Promise.reject(error);

          original.headers = {
            ...(original.headers ?? {}),
            Authorization: `Bearer ${newToken}`,
          };
          return api(original);
        }

        return new Promise((resolve, reject) => {
          pendingQueue.push((newToken) => {
            if (!newToken) return reject(error);
            original.headers = {
              ...(original.headers ?? {}),
              Authorization: `Bearer ${newToken}`,
            };
            resolve(api(original));
          });
        });
      }

      return Promise.reject(error);
    }
  );

  return api;
}

export const api = createApiClient();
