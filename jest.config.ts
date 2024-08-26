/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
// import type { JestConfigWithTsJest } from "ts-jest";
import type { Config } from "jest";

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  coveragePathIgnorePatterns: ["/node_modules/", "test-utils.tsx"],
};

module.exports = createJestConfig(config);
