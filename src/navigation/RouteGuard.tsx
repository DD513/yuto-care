import React from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import {
  selectBootstrapped,
  selectIsAuthenticated,
} from "@/features/auth/authSlice";
import {
  getRouteConfigOrDefault,
  validateAllRouteConfigs,
  isDev,
} from "@/utils/route";

export function RouteGuard() {
  const bootstrapped = useAppSelector(selectBootstrapped);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const segments = useSegments();
  const router = useRouter();

  // 只在 dev 時驗證一次（mount 時）
  React.useEffect(() => {
    if (!isDev()) return;
    validateAllRouteConfigs();
  }, []);

  React.useEffect(() => {
    if (!bootstrapped) return;

    const routeConfig = getRouteConfigOrDefault(segments);

    // 1) 公開頁：永遠放行
    if (routeConfig.public) return;

    // 2) authOnly：已登入者不應進入（login/register）
    if (routeConfig.authOnly) {
      if (isAuthenticated) router.replace("/(main)");
      return;
    }

    // 3) 需要登入：未登入導去 login
    if (routeConfig.requiresAuth && !isAuthenticated) {
      router.replace("/(auth)/login");
      return;
    }

    // 4) 其他狀況：放行
  }, [bootstrapped, isAuthenticated, segments, router]);

  if (!bootstrapped) return null;
  return <Slot />;
}
