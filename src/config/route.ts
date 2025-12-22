type RouteAuthConfig = {
  requiresAuth: boolean;
  authOnly?: boolean;
  public?: boolean;
};

export const ROUTE_CONFIG: Record<string, RouteAuthConfig> = {
  // ✅ 群組層級：一行覆蓋整個群組
  "(auth)": { requiresAuth: false, authOnly: true }, // 未登入才能看
  "(main)": { requiresAuth: true }, // 需要登入

  // ✅ 例外（如果你真的需要更細的規則才加）
  // "(main)/member/theme": { requiresAuth: true },

  // ✅ 公開頁例子
  // "(public)": { requiresAuth: false, public: true },
} as const;

export type { RouteAuthConfig };
