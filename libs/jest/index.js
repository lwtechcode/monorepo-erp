const path = require('path');
const merge = require('deepmerge');

const ignoreModules = ['axios'].join('|');

module.exports = (options) =>
  merge(options, {
    testEnvironment: 'jsdom',
    resolver: `${__dirname}/jest.resolver.js`,
    setupFilesAfterEnv: [`${__dirname}/jest.setup.js`],
    transformIgnorePatterns: [`node_modules/(?!(${ignoreModules}))`],
    moduleNameMapper: {
      '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
      '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${path.resolve(
        __dirname,
        '__mocks__',
        'file-mock.js',
      )}`,
    },
    globals: {
      __PATH_PREFIX__: ``,
    },
  });
