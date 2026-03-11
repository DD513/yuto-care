import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import LoginScreen from "@/screens/auth/Login/LoginScreen";

const mockDispatch = jest.fn(() => ({
  unwrap: jest.fn().mockResolvedValue(undefined),
}));

const mockLogin = jest.fn((payload) => ({
  type: "auth/login",
  payload,
}));

const mockClearAuthError = jest.fn(() => ({
  type: "auth/clearAuthError",
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) =>
    selector({
      auth: { error: null },
    }),
}));

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colorScheme: "light",
    theme: "light",
    setTheme: jest.fn(),
  }),
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
});
