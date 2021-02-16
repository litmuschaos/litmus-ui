module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.(css|scss|sass)$': '<rootDir>/mocks/styleMock.js',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/index.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'dist/', '<rootDir>/src/lab/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,tsx,jsx}',
    '!<rootDir>/src/**/*.stories.*',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
