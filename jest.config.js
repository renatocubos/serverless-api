module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,

  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  coverageProvider: "v8",
  collectCoverage: false,
  coverageReporters: ["lcov", "text"],
  coveragePathIgnorePatterns: ["/node_modules/", "/build/", "/__tests__/"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],
};
