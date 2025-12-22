import React from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth } from "@/contexts/AuthProvider";
import {
  getRouteConfigOrDefault,
  validateAllRouteConfigs,
} from "@/utils/route";

export function RouteGuard() {
  const { bootstrapped, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // ✅ 只在 dev 時驗證一次（mount 時）
  React.useEffect(() => {
    validateAllRouteConfigs();
  }, []);

  React.useEffect(() => {
    if (!bootstrapped) return;

    const cfg = getRouteConfigOrDefault(segments);

    // ✅ 1) 公開頁：永遠放行
    if (cfg.public) return;

    // ✅ 2) authOnly：已登入者不應進入（login/register）
    if (cfg.authOnly) {
      if (isAuthenticated) router.replace("/(main)");
      return;
    }

    // ✅ 3) 需要登入：未登入導去 login
    if (cfg.requiresAuth && !isAuthenticated) {
      router.replace("/(auth)/login");
      return;
    }

    // ✅ 4) 其他狀況：放行
  }, [bootstrapped, isAuthenticated, segments, router]);

  if (!bootstrapped) return null;
  return <Slot />;
}
