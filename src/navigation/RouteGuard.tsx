import React from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth } from "@/contexts/AuthProvider";

export function RouteGuard() {
  const { bootstrapped, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (!bootstrapped) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(main)");
    }
  }, [bootstrapped, isAuthenticated, segments, router]);

  if (!bootstrapped) return null;
  return <Slot />;
}
