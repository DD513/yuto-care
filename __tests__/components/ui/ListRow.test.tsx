import React from "react";
import { Text } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ListRow } from "@/components/ui/ListRow";
import { Colors } from "@/constants/colors";
import {
  createMockThemeState,
  type MockThemeState,
} from "@test-utils/mockTheme";
import { mockIoniconsRender, resetMockIcons } from "@test-utils/mockIcons";

let mockThemeState: MockThemeState = createMockThemeState();

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => mockThemeState,
}));

describe("ListRow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetMockIcons();

    mockThemeState = createMockThemeState({
      theme: "light",
      colorScheme: "light",
    });
  });

  it("renders label", () => {
    render(<ListRow label="主題" />);

    expect(screen.getByText("主題")).toBeTruthy();
  });

  it("renders value when provided", () => {
    render(<ListRow label="主題" value="淺色" />);

    expect(screen.getByText("主題")).toBeTruthy();
    expect(screen.getByText("淺色")).toBeTruthy();
  });

  it("renders rightSlot instead of value when rightSlot is provided", () => {
    render(
      <ListRow
        label="通知"
        value="開啟"
        rightSlot={<Text testID="custom-slot">自訂內容</Text>}
      />,
    );

    expect(screen.getByText("通知")).toBeTruthy();
    expect(screen.getByTestId("custom-slot")).toBeTruthy();
    expect(screen.queryByText("開啟")).toBeNull();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();

    render(<ListRow label="主題" onPress={onPress} testID="list-row" />);

    fireEvent.press(screen.getByTestId("list-row"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("is disabled when onPress is not provided", () => {
    render(<ListRow label="主題" testID="list-row" />);

    expect(screen.getByTestId("list-row")).toBeDisabled();
  });

  it("respects disabled prop even when onPress exists", () => {
    const onPress = jest.fn();

    render(
      <ListRow label="主題" onPress={onPress} disabled testID="list-row" />,
    );

    const row = screen.getByTestId("list-row");

    expect(row).toBeDisabled();

    fireEvent.press(row);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("renders left icon when iconName is provided", () => {
    render(<ListRow label="主題" iconName="color-palette-outline" />);

    expect(screen.getByText("color-palette-outline")).toBeTruthy();
  });

  it("renders chevron when showChevron is true", () => {
    render(
      <ListRow label="主題" iconName="color-palette-outline" showChevron />,
    );

    expect(screen.getByText("chevron-forward")).toBeTruthy();
  });

  it("does not render chevron when showChevron is false", () => {
    render(
      <ListRow label="登出" iconName="log-out-outline" showChevron={false} />,
    );

    expect(screen.queryByText("chevron-forward")).toBeNull();
  });

  it("uses default icon color when danger is false", () => {
    render(<ListRow label="主題" iconName="color-palette-outline" />);

    expect(mockIoniconsRender).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "color-palette-outline",
        color: Colors.light.icon.default,
      }),
    );
  });

  it("uses danger icon color when danger is true", () => {
    render(<ListRow label="登出" iconName="log-out-outline" danger />);

    expect(mockIoniconsRender).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "log-out-outline",
        color: Colors.light.icon.danger,
      }),
    );
  });

  it("uses theme-based icon color in dark mode", () => {
    mockThemeState = createMockThemeState({
      theme: "dark",
      colorScheme: "dark",
    });

    render(<ListRow label="主題" iconName="color-palette-outline" />);

    expect(mockIoniconsRender).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "color-palette-outline",
        color: Colors.dark.icon.default,
      }),
    );
  });

  it("renders without iconName", () => {
    render(<ListRow label="帳號" />);

    expect(screen.getByText("帳號")).toBeTruthy();
  });
});
