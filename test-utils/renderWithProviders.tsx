import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "@/store";
import { YutoThemeProvider } from "@/contexts/ThemeProvider";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <YutoThemeProvider>
        <SafeAreaProvider>{ui}</SafeAreaProvider>
      </YutoThemeProvider>
    </Provider>,
  );
}
