const { color } = require('@lib/tokens');

/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: { ...color },
    },
  },
};
