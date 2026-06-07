export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/tests/**/*.test.ts"],
};