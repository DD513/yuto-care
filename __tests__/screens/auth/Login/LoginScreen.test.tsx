import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import LoginScreen from "@/screens/auth/Login/LoginScreen";
import {
  createMockThemeState,
  type MockThemeState,
} from "@test-utils/mockTheme";

function createDeferred<T = unknown>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

const mockUnwrap = jest.fn().mockResolvedValue(undefined);

const mockDispatch = jest.fn(() => ({
  unwrap: mockUnwrap,
}));

const mockLogin = jest.fn((payload) => ({
  type: "auth/login",
  payload,
}));

const mockClearAuthError = jest.fn(() => ({
  type: "auth/clearAuthError",
}));

let mockThemeState: MockThemeState = createMockThemeState();

let mockAuthState = {
  auth: { error: null as string | null },
};

jest.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockAuthState),
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => mockThemeState,
}));

jest.mock("@/features/auth/authSlice", () => ({
  login: (payload: any) => mockLogin(payload),
  clearAuthError: () => mockClearAuthError(),
  selectAuthError: (state: any) => state.auth.error,
}));

jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      APP_ENV: "test",
      API_BASE_URL: "http://localhost",
    },
  },
}));

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockThemeState = createMockThemeState();

    mockAuthState = {
      auth: { error: null },
    };
  });

  it("renders login screen elements", () => {
    render(<LoginScreen />);

    expect(screen.getByText("Yuto")).toBeTruthy();
    expect(screen.getByPlaceholderText("example@gmail.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("************")).toBeTruthy();
  });

  it("disables login button when inputs are empty", () => {
    render(<LoginScreen />);

    const loginButton = screen.getByTestId("login-button");

    expect(loginButton).toBeDisabled();
  });

  it("enables login button when account and password are filled", () => {
    render(<LoginScreen />);

    const account = screen.getByPlaceholderText("example@gmail.com");
    const password = screen.getByPlaceholderText("************");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.changeText(account, "nurse@test.com");
    fireEvent.changeText(password, "123456");

    expect(loginButton).not.toBeDisabled();
  });

  it("dispatches login when pressing login button", async () => {
    render(<LoginScreen />);

    const account = screen.getByPlaceholderText("example@gmail.com");
    const password = screen.getByPlaceholderText("************");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.changeText(account, "nurse@test.com");
    fireEvent.changeText(password, "123456");

    fireEvent.press(loginButton);

    await screen.findByText("登入"); // 等待 state update

    expect(mockClearAuthError).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledWith({
      account: "nurse@test.com",
      password: "123456",
    });
  });

  it("shows login error message when authError is LOGIN_FAILED", () => {
    mockAuthState = {
      auth: { error: "LOGIN_FAILED" },
    };

    render(<LoginScreen />);

    expect(screen.getByText("登入失敗，請確認帳密或網路狀態")).toBeTruthy();
  });

  it("shows loading state while login is in progress", async () => {
    const deferred = createDeferred<void>();
    mockUnwrap.mockReturnValueOnce(deferred.promise);

    render(<LoginScreen />);

    const account = screen.getByPlaceholderText("example@gmail.com");
    const password = screen.getByPlaceholderText("************");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.changeText(account, "nurse@test.com");
    fireEvent.changeText(password, "123456");
    fireEvent.press(loginButton);

    expect(screen.getByTestId("login-loading")).toBeTruthy();
    expect(screen.getByText("Logging in...")).toBeTruthy();

    deferred.resolve();

    await screen.findByTestId("login-button");
  });
});
