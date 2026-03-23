import React from "react";
import { Text } from "react-native";

export const mockIoniconsRender = jest.fn();

type MockIoniconsProps = {
  name?: string;
  testID?: string;
  color?: string;
  size?: number;
  accessibilityLabel?: string;
  [key: string]: any;
};

export function resetMockIcons() {
  mockIoniconsRender.mockReset();
}

export function MockIonicons({
  name,
  testID,
  color,
  size,
  accessibilityLabel,
  ...rest
}: MockIoniconsProps) {
  mockIoniconsRender({
    name,
    testID,
    color,
    size,
    accessibilityLabel,
    ...rest,
  });

  return (
    <Text
      testID={testID ?? `icon-${String(name)}`}
      accessibilityLabel={
        accessibilityLabel ?? `icon-${String(name)}-${String(color ?? "")}`
      }
      {...rest}
    >
      {String(name)}
    </Text>
  );
}

(MockIonicons as any).glyphMap = {
  "chevron-forward": 1,
  "chevron-back": 1,
  "color-palette-outline": 1,
  "log-out-outline": 1,
  "notifications-outline": 1,
  "lock-closed-outline": 1,
  "person-outline": 1,
  "help-circle-outline": 1,
  "information-circle-outline": 1,
  "star-outline": 1,
  checkmark: 1,
  "eye-off-outline": 1,
  "eye-outline": 1,
};
