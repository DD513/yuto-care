import React from "react";
import { View } from "react-native";

type Props = {
  children?: React.ReactNode;
};

export function SafeAreaProvider({ children }: Props) {
  return <View>{children}</View>;
}
SafeAreaProvider.displayName = "SafeAreaProvider";

export function SafeAreaView({ children }: Props) {
  return <View>{children}</View>;
}
SafeAreaView.displayName = "SafeAreaView";

export function useSafeAreaInsets() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}

export function useSafeAreaFrame() {
  return {
    x: 0,
    y: 0,
    width: 320,
    height: 640,
  };
}

export const initialWindowMetrics = {
  insets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  frame: {
    x: 0,
    y: 0,
    width: 320,
    height: 640,
  },
};
