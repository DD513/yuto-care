import React from "react";
import { authApi, type User } from "@/api/auth";
import { tokenStorage } from "@/api/tokenStorage";

type AuthState = {
  bootstrapped: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (account: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [bootstrapped, setBootstrapped] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const isAuthenticated = !!user;

  const refreshMe = React.useCallback(async () => {
    const tokens = await tokenStorage.get();
    if (!tokens?.accessToken) {
      setUser(null);
      return;
    }

    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      // token 無效或被撤銷
      await tokenStorage.clear();
      setUser(null);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      await refreshMe();
      setBootstrapped(true);
    })();
  }, [refreshMe]);

  const login = React.useCallback(async (account: string, password: string) => {
    const me = await authApi.login({ account, password });
    setUser(me);
  }, []);

  const logout = React.useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value: AuthState = {
    bootstrapped,
    isAuthenticated,
    user,
    login,
    logout,
    refreshMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
