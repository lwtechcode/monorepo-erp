/* eslint-disable no-prototype-builtins */
const StyleDictionary = require('style-dictionary');

function minifyDictionary(obj) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  var toRet = {};

  if (obj.hasOwnProperty('value')) {
    return obj.value;
  } else {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        toRet[name] = minifyDictionary(obj[name]);
      }
    }
  }
  return toRet;
}

const rootPixelEm = (value) => {
  value = Number(value);
  return isNaN(value) ? value : value * 0.0625 + 'rem';
};

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `size/pxToRem`,
  matcher: (token) => {
    return token.attributes.category === 'rem';
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    return rootPixelEm(token.value);
  },
});

// Register an "attribute" transform to codify the font's details
// as named attributes.
StyleDictionary.registerTransform({
  name: 'attribute/font',
  type: 'attribute',
  transformer: (prop) => ({
    category: prop.path[0],
    type: prop.path[1],
    family: prop.path[2],
    weight: prop.path[3],
    style: prop.path[4],
  }),
});

// Register a custom format to generate @font-face rules.
StyleDictionary.registerFormat({
  name: 'font-face',
  formatter: ({ dictionary: { allTokens }, options }) => {
    const fontPathPrefix = options.fontPathPrefix || '../';

    function toBase64(file) {
      var data = require('fs').readFileSync(file);
      var buff = Buffer.from(data, 'ascii');
      return buff.toString('base64');
    }

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
    const formatsMap = {
      woff2: 'woff2',
      woff: 'woff',
      ttf: 'truetype',
      otf: 'opentype',
      svg: 'svg',
      eot: 'embedded-opentype',
    };

    return allTokens
      .reduce((fontList, prop) => {
        const {
          attributes: { family, weight, style },
          formats,
          value: path,
        } = prop;

        const urls = formats.map((extension) => {
          const file = `${fontPathPrefix}${path}.${extension}`;
          const format = formatsMap[extension];
          const base64 = toBase64(file);
          const url = `data:font/${format};charset=utf-8;base64,${base64}`;

          return `url("${url}") format("${format}")`;
        });

        const fontCss = [
          '@font-face {',
          `\n\tfont-family: "${family.replace(/_/g, ' ')}";`,
          `\n\tfont-style: ${style};`,
          `\n\tfont-weight: ${weight};`,
          '\n\tfont-display: swap;',
          `\n\tsrc: ${urls.join(',\n\t\t\t ')};`,
          '\n}\n',
        ].join('');

        fontList.push(fontCss);

        return fontList;
      }, [])
      .join('\n');
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/nested',
  formatter: function ({ dictionary }) {
    const tokens = minifyDictionary(dictionary.tokens);

    return Object.keys(tokens).reduce(
      (acc, key) =>
        (acc += `export const ${key} = ${JSON.stringify(
          tokens[key],
          null,
          2,
        )} as const\n`),
      '',
    );
  },
});

StyleDictionary.registerFilter({
  name: 'not_asset',
  matcher: function (token) {
    return token.attributes.category !== 'asset';
  },
});

module.exports = {
  source: ['src/**/*.js'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'temp/',
      transforms: ['size/pxToRem', 'attribute/font'],
      files: [
        {
          format: 'typescript/nested',
          destination: 'index.ts',
          filter: 'not_asset',
        },
      ],
    },
    'css-variables': {
      transformGroup: 'css',
      buildPath: 'dist/',
      transforms: ['size/pxToRem', 'attribute/font'],
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          filter: 'not_asset',
        },
      ],
    },
    'css-font-face': {
      transforms: ['attribute/font'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'fonts.css',
          format: 'font-face',
          filter: {
            attributes: {
              category: 'asset',
              type: 'font',
            },
          },
          options: {
            fontPathPrefix: './',
          },
        },
      ],
    },
  },
};
