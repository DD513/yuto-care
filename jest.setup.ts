// React Native Reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

require("react-native-reanimated").setUpTests();

// Expo Router mock
jest.mock("expo-router", () => {
  const actual = jest.requireActual("expo-router");
  return {
    ...actual,
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    },
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useSegments: () => ["(auth)", "login"],
  };
});

// Vector Icons mock
jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

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
  require("@react-native-async-storage/async-storage/jest/async_storage_mock")
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