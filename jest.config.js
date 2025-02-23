const jest = require('@lib/jest');

module.exports = jest({
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: [
    'apps/**/src/**/*.tsx',
    'libs/**/src/**/*.tsx',
    '!apps/**/src/**/index.tsx',
    '!libs/**/src/**/*.stories.tsx',
  ],
});
