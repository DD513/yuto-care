import React from "react";
import { Text } from "react-native";
import { render, screen, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { colorScheme as nativeWindColorScheme } from "nativewind";

import { YutoThemeProvider, YutoThemeContext } from "@/contexts/ThemeProvider";

jest.mock("nativewind", () => ({
  colorScheme: {
    set: jest.fn(),
  },
}));

describe("YutoThemeProvider", () => {
  const mockAddChangeListener = jest.spyOn(Appearance, "addChangeListener");
  const mockGetColorScheme = jest.spyOn(Appearance, "getColorScheme");

  function Consumer() {
    const ctx = React.useContext(YutoThemeContext);

    if (!ctx) {
      return <Text>no-context</Text>;
    }

    return (
      <>
        <Text testID="theme">{ctx.theme}</Text>
        <Text testID="colorScheme">{ctx.colorScheme}</Text>
        <Text
          testID="set-dark"
          onPress={() => {
            ctx.setTheme("dark");
          }}
        >
          set-dark
        </Text>
        <Text
          testID="set-system"
          onPress={() => {
            ctx.setTheme("system");
          }}
        >
          set-system
        </Text>
      </>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetColorScheme.mockReturnValue("light");
    mockAddChangeListener.mockImplementation((listener: any) => {
      return {
        remove: jest.fn(),
      } as any;
    });
  });

  it("does not render children before theme is ready", () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    render(
      <YutoThemeProvider>
        <Text>theme-content</Text>
      </YutoThemeProvider>,
    );

    expect(screen.queryByText("theme-content")).toBeNull();
  });

  it("loads saved theme from AsyncStorage and provides it through context", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");

    render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("dark");
    });

    expect(screen.getByTestId("colorScheme").props.children).toBe("dark");
  });

  it("falls back to system theme when storage value is invalid", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("invalid-value");
    mockGetColorScheme.mockReturnValue("light");

    render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("system");
    });

    expect(screen.getByTestId("colorScheme").props.children).toBe("light");
  });

  it("writes theme to AsyncStorage when setTheme is called", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("light");

    render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("light");
    });

    act(() => {
      screen.getByTestId("set-dark").props.onPress();
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "yuto-theme-mode",
        "dark",
      );
    });

    expect(screen.getByTestId("theme").props.children).toBe("dark");
    expect(screen.getByTestId("colorScheme").props.children).toBe("dark");
  });

  it("syncs nativewind color scheme to system when theme is system", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("system");
    mockGetColorScheme.mockReturnValue("dark");

    render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("system");
    });

    expect(nativeWindColorScheme.set).toHaveBeenCalledWith("system");
    expect(screen.getByTestId("colorScheme").props.children).toBe("dark");
  });

  it("syncs nativewind color scheme to dark when theme is dark", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");

    render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("dark");
    });

    expect(nativeWindColorScheme.set).toHaveBeenCalledWith("dark");
  });

  it("updates system colorScheme when Appearance change listener fires", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("system");

    let capturedListener:
      | ((event: { colorScheme: "light" | "dark" | null }) => void)
      | undefined;

    mockAddChangeListener.mockImplementation((listener: any) => {
      capturedListener = listener;
      return {
        remove: jest.fn(),
      } as any;
    });

    render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("system");
    });

    act(() => {
      capturedListener?.({ colorScheme: "dark" });
    });

    expect(screen.getByTestId("colorScheme").props.children).toBe("dark");
  });

  it("removes Appearance listener on unmount", async () => {
    const remove = jest.fn();

    mockAddChangeListener.mockImplementation(() => {
      return { remove } as any;
    });

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("system");

    const { unmount } = render(
      <YutoThemeProvider>
        <Consumer />
      </YutoThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("theme").props.children).toBe("system");
    });

    unmount();

    expect(remove).toHaveBeenCalled();
  });
});
