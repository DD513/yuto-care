// React Native Reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

require("react-native-reanimated").setUpTests();

// Expo Router mock
jest.mock("expo-router", () => {
  const actual = jest.requireActual("expo-router");
  const { mockRouter } = require("./test-utils/mockRouter");

  return {
    ...actual,
    router: {
      push: (...args: any[]) => mockRouter.push(...args),
      replace: (...args: any[]) => mockRouter.replace(...args),
      back: (...args: any[]) => mockRouter.back(...args),
    },
    useRouter: () => ({
      push: (...args: any[]) => mockRouter.push(...args),
      replace: (...args: any[]) => mockRouter.replace(...args),
      back: (...args: any[]) => mockRouter.back(...args),
    }),
    useSegments: () => mockRouter.useSegments(),
  };
});

// Vector Icons mock
jest.mock("@expo/vector-icons", () => {
  const { MockIonicons } = require("./test-utils/mockIcons");
  return {
    Ionicons: MockIonicons,
  };
});

// Expo constants
jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      APP_ENV: "test",
      API_BASE_URL: "http://localhost",
    },
  },
}));

// AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// SecureStore
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Appearance
jest.mock("react-native/Libraries/Utilities/Appearance", () => {
  let currentScheme = "light";

  return {
    getColorScheme: jest.fn(() => currentScheme),
    addChangeListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
    removeChangeListener: jest.fn(),
    setColorScheme: jest.fn(),
    __setColorScheme: (scheme: "light" | "dark") => {
      currentScheme = scheme;
    },
  };
});