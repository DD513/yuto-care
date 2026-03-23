import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { UnderlineInput } from "@/components/ui/UnderlineInput";

const mockSetTheme = jest.fn();
const mockOnChangeText = jest.fn();
const mockOnPressRightIcon = jest.fn();

jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colorScheme: "light",
    theme: "light",
    setTheme: mockSetTheme,
  }),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

describe("UnderlineInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and placeholder", () => {
    render(
      <UnderlineInput
        label="帳號"
        placeholder="請輸入帳號"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(screen.getByText("帳號")).toBeTruthy();
    expect(screen.getByPlaceholderText("請輸入帳號")).toBeTruthy();
  });

  it("calls onChangeText when typing", () => {
    render(
      <UnderlineInput
        label="帳號"
        placeholder="請輸入帳號"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    const input = screen.getByPlaceholderText("請輸入帳號");
    fireEvent.changeText(input, "nurse001");

    expect(mockOnChangeText).toHaveBeenCalledWith("nurse001");
  });

  it("renders right icon button when rightIconName is provided", () => {
    render(
      <UnderlineInput
        label="密碼"
        placeholder="請輸入密碼"
        value=""
        onChangeText={mockOnChangeText}
        rightIconName="eye-outline"
        onPressRightIcon={mockOnPressRightIcon}
      />,
    );

    const iconButton = screen.getByTestId("underline-input-right-icon-button");
    expect(iconButton).toBeTruthy();
  });

  it("does not render right icon button when rightIconName is not provided", () => {
    render(
      <UnderlineInput
        label="帳號"
        placeholder="請輸入帳號"
        value=""
        onChangeText={mockOnChangeText}
      />,
    );

    expect(
      screen.queryByTestId("underline-input-right-icon-button"),
    ).toBeNull();
  });

  it("calls onPressRightIcon when pressing icon button", () => {
    render(
      <UnderlineInput
        label="密碼"
        placeholder="請輸入密碼"
        value=""
        onChangeText={mockOnChangeText}
        rightIconName="eye-outline"
        onPressRightIcon={mockOnPressRightIcon}
      />,
    );

    const iconButton = screen.getByTestId("underline-input-right-icon-button");
    fireEvent.press(iconButton);

    expect(mockOnPressRightIcon).toHaveBeenCalled();
  });

  it("passes secureTextEntry to TextInput", () => {
    render(
      <UnderlineInput
        label="密碼"
        placeholder="請輸入密碼"
        value=""
        onChangeText={mockOnChangeText}
        secureTextEntry
      />,
    );

    const input = screen.getByPlaceholderText("請輸入密碼");
    expect(input.props.secureTextEntry).toBe(true);
  });
});
