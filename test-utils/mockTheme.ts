export type MockThemeMode = "light" | "dark" | "system";
export type MockColorScheme = "light" | "dark";

export type MockThemeState = {
  theme: MockThemeMode;
  colorScheme: MockColorScheme;
  setTheme: jest.Mock;
};

export function createMockThemeState(
  overrides?: Partial<MockThemeState>,
): MockThemeState {
  return {
    theme: "light",
    colorScheme: "light",
    setTheme: jest.fn(),
    ...overrides,
  };
}