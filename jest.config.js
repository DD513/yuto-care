module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.expo/**",
  ],
  moduleNameMapper: {
    "^react-native-safe-area-context$":
      "<rootDir>/test-utils/mocks/react-native-safe-area-context.tsx",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@test-utils/(.*)$": "<rootDir>/test-utils/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-native|expo(nent)?|@expo(nent)?/.*|expo-router|@expo/.*|react-navigation|@react-navigation/.*|react-redux|@reduxjs/toolkit|immer)",
  ],
};
