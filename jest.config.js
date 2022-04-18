module.exports = {
  collectCoverage: true,
  coverageDirectory: './tests/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/resources/',
    '/scripts/',
  ],
  verbose: true,
  testEnvironment: 'node',
};
