import { ROUTE_CONFIG, type RouteAuthConfig } from "@/config/route";
import { ENV } from "@/config/env";

export function isDev() {
  return ENV.appEnv === "development";
}

function warnDev(message: string) {
  if (isDev()) console.warn(message);
}

/**
 * development 時驗證單一路由設定是否自洽（不 throw，避免你開發被卡死）
 */
export function validateRouteConfigKey(
  key: string,
  config: RouteAuthConfig
): void {
  if (!isDev()) return;

  const issues: string[] = [];

  // public / authOnly 都代表不需要登入（語意上）
  if (config.public && config.requiresAuth) {
    issues.push(`public=true but requiresAuth=true`);
  }
  if (config.authOnly && config.requiresAuth) {
    issues.push(`authOnly=true but requiresAuth=true`);
  }
  if (config.public && config.authOnly) {
    issues.push(`public=true and authOnly=true should not both be true`);
  }

  if (issues.length > 0) {
    warnDev(`[ROUTE_CONFIG] Invalid config at "${key}": ${issues.join(", ")}`);
  }
}

/**
 * 啟動時驗證整份 ROUTE_CONFIG（建議在 RouteGuard mount 時呼叫一次）
 */
export function validateAllRouteConfigs(): void {
  if (!isDev()) return;

  Object.entries(ROUTE_CONFIG).forEach(([key, config]) => {
    validateRouteConfigKey(key, config);
  });
}

/**
 * 根據路由 segments 獲取路由配置
 * 匹配優先級：完整路徑 > 群組路徑 > 父路徑
 */
export function getRouteConfig(segments: string[]): RouteAuthConfig | undefined {
  if (segments.length === 0) return undefined;

  const fullPath = segments.join("/");

  if (isDev()) {
    console.log(`[RouteGuard] segments=`, segments, `fullPath=${fullPath}`);
  }

  // 1) 完整路徑匹配
  const exact = ROUTE_CONFIG[fullPath];
  if (exact) {
    validateRouteConfigKey(fullPath, exact);
    return exact;
  }

  // 2) 群組路徑匹配（"(auth)" "(main)"）
  const groupPath = segments[0];
  const group = ROUTE_CONFIG[groupPath];
  if (group) {
    validateRouteConfigKey(groupPath, group);
    return group;
  }

  // 3) 父路徑匹配
  for (let i = segments.length - 1; i > 0; i--) {
    const parentPath = segments.slice(0, i).join("/");
    const parent = ROUTE_CONFIG[parentPath];
    if (parent) {
      validateRouteConfigKey(parentPath, parent);
      return parent;
    }
  }

  return undefined;
}

/**
 * 統一產生「安全預設 config」
 * 你原本是：沒定義就當 requiresAuth:true（安全）
 */
export function getRouteConfigOrDefault(
  segments: string[]
): RouteAuthConfig & { __default?: boolean } {
  
  const config = getRouteConfig(segments);
  if (config) return config;

  const fullPath = segments.join("/");

  warnDev(
    `[RouteGuard] Route not configured: "${fullPath}", defaulting to requiresAuth: true`
  );

  return { requiresAuth: true, __default: true };
}
