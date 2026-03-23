export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  useSegments: jest.fn(() => ["(auth)", "login"]),
};

export function resetMockRouter() {
  mockRouter.push.mockReset();
  mockRouter.replace.mockReset();
  mockRouter.back.mockReset();
  mockRouter.useSegments.mockReset();
  mockRouter.useSegments.mockReturnValue(["(auth)", "login"]);
}