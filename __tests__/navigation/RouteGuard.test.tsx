import React from "react";
import { render } from "@testing-library/react-native";
import { RouteGuard } from "@/navigation/RouteGuard";
import * as routeUtils from "@/utils/route";

const mockReplace = jest.fn();
const mockRenderSlot = jest.fn();

let mockAuthState = {
  auth: {
    bootstrapped: true,
    status: "guest",
  },
};

let mockSegments: string[] = ["(auth)", "login"];

let mockRouteConfig = {
  public: false,
  authOnly: false,
  requiresAuth: true,
};

let mockIsDev = true;

jest.mock("@/store/hooks", () => ({
  useAppSelector: (selector: any) => selector(mockAuthState),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useSegments: () => mockSegments,
  Slot: function MockSlot() {
    mockRenderSlot();
    return null;
  },
}));

jest.mock("@/utils/route", () => ({
  validateAllRouteConfigs: jest.fn(),
  getRouteConfigOrDefault: jest.fn(() => mockRouteConfig),
  isDev: jest.fn(() => mockIsDev),
}));

describe("RouteGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockAuthState = {
      auth: {
        bootstrapped: true,
        status: "guest",
      },
    };

    mockSegments = ["(auth)", "login"];

    mockRouteConfig = {
      public: false,
      authOnly: false,
      requiresAuth: true,
    };

    mockIsDev = true;
  });

  it("renders nothing when bootstrapped is false", () => {
    mockAuthState = {
      auth: {
        bootstrapped: false,
        status: "guest",
      },
    };

    render(<RouteGuard />);

    expect(mockRenderSlot).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("allows public routes without redirect", () => {
    mockRouteConfig = {
      public: true,
      authOnly: false,
      requiresAuth: false,
    };

    render(<RouteGuard />);

    expect(mockRenderSlot).toHaveBeenCalledTimes(1);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("redirects authenticated user away from authOnly routes", () => {
    mockAuthState = {
      auth: {
        bootstrapped: true,
        status: "authenticated",
      },
    };

    mockRouteConfig = {
      public: false,
      authOnly: true,
      requiresAuth: false,
    };

    render(<RouteGuard />);

    expect(mockReplace).toHaveBeenCalledWith("/(main)");
    expect(mockRenderSlot).toHaveBeenCalledTimes(1);
  });

  it("redirects guest user away from protected routes", () => {
    mockAuthState = {
      auth: {
        bootstrapped: true,
        status: "guest",
      },
    };

    mockRouteConfig = {
      public: false,
      authOnly: false,
      requiresAuth: true,
    };

    render(<RouteGuard />);

    expect(mockReplace).toHaveBeenCalledWith("/(auth)/login");
    expect(mockRenderSlot).toHaveBeenCalledTimes(1);
  });

  it("allows authenticated user into protected routes", () => {
    mockAuthState = {
      auth: {
        bootstrapped: true,
        status: "authenticated",
      },
    };

    mockRouteConfig = {
      public: false,
      authOnly: false,
      requiresAuth: true,
    };

    render(<RouteGuard />);

    expect(mockRenderSlot).toHaveBeenCalledTimes(1);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("calls validateAllRouteConfigs on mount in development", () => {
    mockIsDev = true;

    render(<RouteGuard />);

    expect(routeUtils.isDev).toHaveBeenCalled();
    expect(routeUtils.validateAllRouteConfigs).toHaveBeenCalledTimes(1);
  });

  it("does not call validateAllRouteConfigs on mount in production", () => {
    mockIsDev = false;

    render(<RouteGuard />);

    expect(routeUtils.isDev).toHaveBeenCalled();
    expect(routeUtils.validateAllRouteConfigs).not.toHaveBeenCalled();
  });
});
