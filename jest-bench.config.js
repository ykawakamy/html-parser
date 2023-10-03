/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  "testEnvironment": "jest-bench/environment",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  reporters: ["default", "jest-bench/reporter"],
  testRegex: "(/__benchmarks__/.*|(\\.|/)bench)\\.[jt]sx?$",
};