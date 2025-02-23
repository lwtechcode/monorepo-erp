const path = require('path');
const base = require('..');

module.exports = base({
  roots: [
    '<rootDir>/configs/',
    '<rootDir>/libs/',
    `${path.resolve(__dirname, '..')}`,
  ],
});
