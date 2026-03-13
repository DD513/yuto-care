import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  bootstrapAuth,
  login,
  logout,
  refreshCurrentUser,
  clearAuthError,
} from "@/features/auth/authSlice";

import { authApi } from "@/api/auth";
import { tokenStorage } from "@/api/tokenStorage";
import { mockUser } from "@/shared/mocks/user";

jest.mock("@/api/auth", () => ({
  authApi: {
    login: jest.fn(),
    getCurrentUser: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock("@/api/tokenStorage", () => ({
  tokenStorage: {
    get: jest.fn(),
    set: jest.fn(),
    clear: jest.fn(),
  },
}));

function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}

describe("authSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------
  // bootstrapAuth
  // -------------------------

  it("bootstrapAuth -> guest when no token", async () => {
    (tokenStorage.get as jest.Mock).mockResolvedValue(null);

    const store = createTestStore();

    await store.dispatch(bootstrapAuth());

    const state = store.getState().auth;

    expect(state.bootstrapped).toBe(true);
    expect(state.status).toBe("guest");
    expect(state.user).toBeNull();
  });

  it("bootstrapAuth -> authenticated when token valid", async () => {
    (tokenStorage.get as jest.Mock).mockResolvedValue({
      accessToken: "token",
    });

    (authApi.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const store = createTestStore();

    await store.dispatch(bootstrapAuth());

    const state = store.getState().auth;

    expect(state.bootstrapped).toBe(true);
    expect(state.status).toBe("authenticated");
    expect(state.user).toEqual(mockUser);
  });

  it("bootstrapAuth -> clear token when getCurrentUser fails", async () => {
    (tokenStorage.get as jest.Mock).mockResolvedValue({
      accessToken: "token",
    });

    (authApi.getCurrentUser as jest.Mock).mockRejectedValue(
      new Error("invalid token")
    );

    const store = createTestStore();

    await store.dispatch(bootstrapAuth());

    const state = store.getState().auth;

    expect(tokenStorage.clear).toHaveBeenCalled();
    expect(state.status).toBe("guest");
    expect(state.user).toBeNull();
  });

  // -------------------------
  // login
  // -------------------------

  it("login success -> authenticated", async () => {
    (authApi.login as jest.Mock).mockResolvedValue(mockUser);

    const store = createTestStore();

    await store.dispatch(
      login({
        account: "nurse@test.com",
        password: "123456",
      })
    );

    const state = store.getState().auth;

    expect(state.status).toBe("authenticated");
    expect(state.user).toEqual(mockUser);
  });

  it("login fail -> LOGIN_FAILED", async () => {
    (authApi.login as jest.Mock).mockRejectedValue(new Error());

    const store = createTestStore();

    await store.dispatch(
      login({
        account: "nurse@test.com",
        password: "wrong",
      })
    );

    const state = store.getState().auth;

    expect(state.status).toBe("guest");
    expect(state.error).toBe("LOGIN_FAILED");
  });

  // -------------------------
  // logout
  // -------------------------

  it("logout clears user", async () => {
    (authApi.login as jest.Mock).mockResolvedValue(mockUser);

    const store = createTestStore();

    await store.dispatch(
      login({
        account: "nurse@test.com",
        password: "123456",
      })
    );

    expect(store.getState().auth.status).toBe("authenticated");

    await store.dispatch(logout());

    const state = store.getState().auth;

    expect(state.status).toBe("guest");
    expect(state.user).toBeNull();
  });

  // -------------------------
  // refreshCurrentUser
  // -------------------------

  it("refreshCurrentUser success", async () => {
    (tokenStorage.get as jest.Mock).mockResolvedValue({
      accessToken: "token",
    });

    (authApi.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const store = createTestStore();

    await store.dispatch(refreshCurrentUser());

    const state = store.getState().auth;

    expect(state.status).toBe("authenticated");
    expect(state.user).toEqual(mockUser);
  });

  // -------------------------
  // clearAuthError
  // -------------------------

  it("clearAuthError resets error", async () => {
    (authApi.login as jest.Mock).mockRejectedValue(new Error());

    const store = createTestStore();

    await store.dispatch(
      login({
        account: "nurse@test.com",
        password: "wrong",
      })
    );

    expect(store.getState().auth.error).toBe("LOGIN_FAILED");

    store.dispatch(clearAuthError());

    expect(store.getState().auth.error).toBeNull();
  });
});