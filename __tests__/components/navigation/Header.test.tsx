import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Header } from "@/components/navigation/Header";
import {
  createMockThemeState,
  type MockThemeState,
} from "@test-utils/mockTheme";
import { mockRouter, resetMockRouter } from "@test-utils/mockRouter";
import { mockIoniconsRender, resetMockIcons } from "@test-utils/mockIcons";

let mockThemeState: MockThemeState = createMockThemeState();

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => mockThemeState,
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetMockRouter();
    resetMockIcons();

    mockThemeState = createMockThemeState({
      theme: "light",
      colorScheme: "light",
    });
  });

  it("renders title", () => {
    render(<Header title="個人" />);

    expect(screen.getByText("個人")).toBeTruthy();
  });

  it("renders back button by default", () => {
    render(<Header title="主題" />);

    expect(screen.getByTestId("header-back-button")).toBeTruthy();
  });

  it("calls router.back when pressing back button", () => {
    render(<Header title="主題" />);

    fireEvent.press(screen.getByTestId("header-back-button"));

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it("does not render back button when showBackButton is false", () => {
    render(<Header title="個人" showBackButton={false} />);

    expect(screen.queryByTestId("header-back-button")).toBeNull();
  });

  it("uses light icon color in light mode", () => {
    mockThemeState = createMockThemeState({
      theme: "light",
      colorScheme: "light",
    });

    render(<Header title="主題" />);

    expect(mockIoniconsRender).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "chevron-back",
        color: "#111827",
        size: 24,
      }),
    );
  });

  it("uses dark icon color in dark mode", () => {
    mockThemeState = createMockThemeState({
      theme: "dark",
      colorScheme: "dark",
    });

    render(<Header title="主題" />);

    expect(mockIoniconsRender).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "chevron-back",
        color: "#F9FAFB",
        size: 24,
      }),
    );
  });
});
