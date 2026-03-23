import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import ThemeScreen from "@/screens/member/ThemeScreen";
import {
  createMockThemeState,
  type MockThemeState,
} from "@test-utils/mockTheme";
import { mockRouter, resetMockRouter } from "@test-utils/mockRouter";

let mockThemeState: MockThemeState = createMockThemeState();

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => mockThemeState,
}));

describe("ThemeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockThemeState = createMockThemeState();
  });

  it("renders theme screen elements correctly", () => {
    render(<ThemeScreen />);

    expect(screen.getByText("主題")).toBeTruthy();
    expect(screen.getByText("跟隨系統")).toBeTruthy();
    expect(screen.getByText("依照裝置外觀自動切換")).toBeTruthy();
    expect(screen.getByText("淺色主題")).toBeTruthy();
    expect(screen.getByText("適合明亮環境使用")).toBeTruthy();
    expect(screen.getByText("深色主題")).toBeTruthy();
    expect(screen.getByText("夜間閱讀更舒適")).toBeTruthy();
  });

  it("shows checkmark for system theme when selected", () => {
    mockThemeState = createMockThemeState({
      theme: "system",
      colorScheme: "light",
    });

    render(<ThemeScreen />);

    expect(screen.getByTestId("theme-check-system")).toBeTruthy();
    expect(screen.queryByTestId("theme-check-light")).toBeNull();
    expect(screen.queryByTestId("theme-check-dark")).toBeNull();
  });

  it("shows checkmark for light theme when selected", () => {
    mockThemeState = createMockThemeState({
      theme: "light",
      colorScheme: "light",
    });

    render(<ThemeScreen />);

    expect(screen.getByTestId("theme-check-light")).toBeTruthy();
    expect(screen.queryByTestId("theme-check-system")).toBeNull();
    expect(screen.queryByTestId("theme-check-dark")).toBeNull();
  });

  it("shows checkmark for dark theme when selected", () => {
    mockThemeState = createMockThemeState({
      theme: "dark",
      colorScheme: "dark",
    });

    render(<ThemeScreen />);

    expect(screen.getByTestId("theme-check-dark")).toBeTruthy();
    expect(screen.queryByTestId("theme-check-system")).toBeNull();
    expect(screen.queryByTestId("theme-check-light")).toBeNull();
  });

  it("calls setTheme when pressing system option", () => {
    render(<ThemeScreen />);

    fireEvent.press(screen.getByTestId("theme-option-system"));

    expect(mockThemeState.setTheme).toHaveBeenCalledWith("system");
  });

  it("calls setTheme when pressing light option", () => {
    render(<ThemeScreen />);

    fireEvent.press(screen.getByTestId("theme-option-light"));

    expect(mockThemeState.setTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme when pressing dark option", () => {
    render(<ThemeScreen />);

    fireEvent.press(screen.getByTestId("theme-option-dark"));

    expect(mockThemeState.setTheme).toHaveBeenCalledWith("dark");
  });

  it("calls router.back when pressing header back button", () => {
    render(<ThemeScreen />);

    fireEvent.press(screen.getByTestId("header-back-button"));

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
