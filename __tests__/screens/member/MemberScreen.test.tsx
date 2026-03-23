import React from "react";
import { Alert } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";
import MemberScreen from "@/screens/member/MemberScreen";
import {
  createMockThemeState,
  type MockThemeState,
} from "@test-utils/mockTheme";
import { mockRouter, resetMockRouter } from "@test-utils/mockRouter";

type MockUser = {
  name: string;
  role: string;
  unit: string;
  uri: string | null;
} | null;

type MockAuthState = {
  auth: {
    user: MockUser;
  };
};

const mockUnwrap = jest.fn().mockResolvedValue(undefined);
const mockDispatch = jest.fn(() => ({
  unwrap: mockUnwrap,
}));

const mockLogout = jest.fn(() => ({
  type: "auth/logout",
}));

let mockThemeState: MockThemeState = createMockThemeState();

let mockAuthState: MockAuthState = {
  auth: {
    user: {
      name: "王小美",
      role: "護理師",
      unit: "ICU",
      uri: null,
    },
  },
};

function renderMemberScreen() {
  return render(<MemberScreen />);
}

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => mockThemeState,
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: MockAuthState) => unknown) =>
    selector(mockAuthState),
}));

jest.mock("@/features/auth/authSlice", () => ({
  logout: () => mockLogout(),
  selectUser: (state: MockAuthState) => state.auth.user,
}));

describe("MemberScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockThemeState = createMockThemeState();

    mockAuthState = {
      auth: {
        user: {
          name: "王小美",
          role: "護理師",
          unit: "ICU",
          uri: null,
        },
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders static sections correctly", () => {
    renderMemberScreen();

    expect(screen.getByText("個人")).toBeTruthy();
    expect(screen.getByText("偏好")).toBeTruthy();
    expect(screen.getByText("主題")).toBeTruthy();
    expect(screen.getByText("通知")).toBeTruthy();
    expect(screen.getByText("登出")).toBeTruthy();
  });

  it("renders user profile info", () => {
    renderMemberScreen();

    expect(screen.getByText("王小美")).toBeTruthy();
    expect(screen.getByText("護理師 · ICU")).toBeTruthy();
  });

  it("renders fallback text when user is null", () => {
    mockAuthState = {
      auth: {
        user: null,
      },
    };

    renderMemberScreen();

    expect(screen.getByText("未登入")).toBeTruthy();
    expect(screen.getByText("— · —")).toBeTruthy();
  });

  it("shows correct theme label for light mode", () => {
    mockThemeState = createMockThemeState({
      theme: "light",
      colorScheme: "light",
    });

    renderMemberScreen();

    expect(screen.getByText("淺色")).toBeTruthy();
  });

  it("shows correct theme label for dark mode", () => {
    mockThemeState = createMockThemeState({
      theme: "dark",
      colorScheme: "dark",
    });

    renderMemberScreen();

    expect(screen.getByText("深色")).toBeTruthy();
  });

  it("shows correct theme label for system light mode", () => {
    mockThemeState = createMockThemeState({
      theme: "system",
      colorScheme: "light",
    });

    renderMemberScreen();

    expect(screen.getByText("跟隨系統（淺色）")).toBeTruthy();
  });

  it("shows correct theme label for system dark mode", () => {
    mockThemeState = createMockThemeState({
      theme: "system",
      colorScheme: "dark",
    });

    renderMemberScreen();

    expect(screen.getByText("跟隨系統（深色）")).toBeTruthy();
  });

  it("navigates to theme page when pressing 主題", () => {
    renderMemberScreen();

    fireEvent.press(screen.getByTestId("member-theme-row"));

    expect(mockRouter.push).toHaveBeenCalledWith("/(main)/member/theme");
  });

  it("shows logout alert and confirms logout flow", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    renderMemberScreen();

    fireEvent.press(screen.getByTestId("member-logout-row"));

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(
      "登出",
      "確定要登出嗎？",
      expect.any(Array),
    );

    const buttons = alertSpy.mock.calls[0][2] as Array<{
      text: string;
      onPress?: () => void | Promise<void>;
    }>;

    const confirmButton = buttons.find((button) => button.text === "登出");
    expect(confirmButton).toBeTruthy();

    await confirmButton?.onPress?.();

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockRouter.replace).toHaveBeenCalledWith("/(auth)/login");
  });

  it("does not logout when cancel is pressed", () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    renderMemberScreen();

    fireEvent.press(screen.getByTestId("member-logout-row"));

    const buttons = alertSpy.mock.calls[0][2] as Array<{
      text: string;
      onPress?: () => void;
    }>;

    const cancelButton = buttons.find((button) => button.text === "取消");
    cancelButton?.onPress?.();

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
});
