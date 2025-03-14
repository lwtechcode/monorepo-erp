module.exports = {
  color: {
    transparent: { attributes: { category: 'color' }, value: 'transparent' },
    inherit: { attributes: { category: 'color' }, value: 'inherit' },
    current: { attributes: { category: 'color' }, value: 'currentColor' },
    base: {
      yellow: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.yellow.400}',
        },
        100: { attributes: { category: 'color' }, value: '#FEFEAC' },
        200: { attributes: { category: 'color' }, value: '#FDFD83' },
        300: { attributes: { category: 'color' }, value: '#FDFD59' },
        400: { attributes: { category: 'color' }, value: '#FCFC30' },
        500: { attributes: { category: 'color' }, value: '#CACA26' },
        600: { attributes: { category: 'color' }, value: '#99991D' },
        700: { attributes: { category: 'color' }, value: '#676713' },
        light: {
          DEFAULT: {
            attributes: { category: 'color' },
            value: '{color.base.yellow.light.400}',
          },
          100: { attributes: { category: 'color' }, value: '#FFF7D1' },
          200: { attributes: { category: 'color' }, value: '#FFF4BB' },
          300: { attributes: { category: 'color' }, value: '#FFF0A4' },
          400: { attributes: { category: 'color' }, value: '#FFEC8D' },
          500: { attributes: { category: 'color' }, value: '#E0CE71' },
          600: { attributes: { category: 'color' }, value: '#C1AF55' },
          700: { attributes: { category: 'color' }, value: '#A29138' },
        },
      },
      blue: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.blue.400}',
        },
        100: { attributes: { category: 'color' }, value: '#B5BFFF' },
        200: { attributes: { category: 'color' }, value: '#909EFF' },
        300: { attributes: { category: 'color' }, value: '#6B7EFF' },
        400: { attributes: { category: 'color' }, value: '#465EFF' },
        500: { attributes: { category: 'color' }, value: '#384CD2' },
        600: { attributes: { category: 'color' }, value: '#2A3AA5' },
        700: { attributes: { category: 'color' }, value: '#1C2877' },
        800: { attributes: { category: 'color' }, value: '#E4ECFF' },
        light: {
          DEFAULT: {
            attributes: { category: 'color' },
            value: '{color.base.blue.light.400}',
          },
          100: { attributes: { category: 'color' }, value: '#BBF1FE' },
          200: { attributes: { category: 'color' }, value: '#98EAFD' },
          300: { attributes: { category: 'color' }, value: '#76E3FD' },
          400: { attributes: { category: 'color' }, value: '#54DCFC' },
          500: { attributes: { category: 'color' }, value: '#43B6D2' },
          600: { attributes: { category: 'color' }, value: '#3391A7' },
          700: { attributes: { category: 'color' }, value: '#226B7D' },
        },
      },
      purple: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.purple.400}',
        },
        100: { attributes: { category: 'color' }, value: '#C7BEE8' },
        200: { attributes: { category: 'color' }, value: '#AB9DDD' },
        300: { attributes: { category: 'color' }, value: '#8F7DD1' },
        400: { attributes: { category: 'color' }, value: '#735CC6' },
        500: { attributes: { category: 'color' }, value: '#5C4A9E' },
        600: { attributes: { category: 'color' }, value: '#453777' },
        700: { attributes: { category: 'color' }, value: '#2E254F' },
        light: {
          DEFAULT: {
            attributes: { category: 'color' },
            value: '{color.base.purple.light.400}',
          },
          100: { attributes: { category: 'color' }, value: '#E5E2FF' },
          200: { attributes: { category: 'color' }, value: '#D7D3FF' },
          300: { attributes: { category: 'color' }, value: '#CAC5FF' },
          400: { attributes: { category: 'color' }, value: '#BDB6FF' },
          500: { attributes: { category: 'color' }, value: '#9A92E8' },
          600: { attributes: { category: 'color' }, value: '#776DD1' },
          700: { attributes: { category: 'color' }, value: '#5449BB' },
        },
      },
      green: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.green.400}',
        },
        100: { attributes: { category: 'color' }, value: '#99F7EC' },
        200: { attributes: { category: 'color' }, value: '#66F3E3' },
        300: { attributes: { category: 'color' }, value: '#33EFD9' },
        400: { attributes: { category: 'color' }, value: '#00EBD0' },
        500: { attributes: { category: 'color' }, value: '#00BCA6' },
        600: { attributes: { category: 'color' }, value: '#008D7D' },
        700: { attributes: { category: 'color' }, value: '#005E53' },
        light: {
          DEFAULT: {
            attributes: { category: 'color' },
            value: '{color.base.green.light.400}',
          },
          100: { attributes: { category: 'color' }, value: '#CDFFF7' },
          200: { attributes: { category: 'color' }, value: '#B5FFF2' },
          300: { attributes: { category: 'color' }, value: '#9CFFEE' },
          400: { attributes: { category: 'color' }, value: '#83FFEA' },
          500: { attributes: { category: 'color' }, value: '#69DECA' },
          600: { attributes: { category: 'color' }, value: '#4FBDAA' },
          700: { attributes: { category: 'color' }, value: '#349C8B' },
        },
      },
      pink: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.pink.400}',
        },
        100: { attributes: { category: 'color' }, value: '#FDCAC6' },
        200: { attributes: { category: 'color' }, value: '#FBAFA9' },
        300: { attributes: { category: 'color' }, value: '#FA958D' },
        400: { attributes: { category: 'color' }, value: '#F97A70' },
        500: { attributes: { category: 'color' }, value: '#D4635A' },
        600: { attributes: { category: 'color' }, value: '#AF4C44' },
        700: { attributes: { category: 'color' }, value: '#89352F' },
        light: {
          DEFAULT: {
            attributes: { category: 'color' },
            value: '{color.base.pink.light.400}',
          },
          100: { attributes: { category: 'color' }, value: '#FFE2DD' },
          200: { attributes: { category: 'color' }, value: '#FFD4CD' },
          300: { attributes: { category: 'color' }, value: '#FFC5BC' },
          400: { attributes: { category: 'color' }, value: '#FFB7AB' },
          500: { attributes: { category: 'color' }, value: '#E69689' },
          600: { attributes: { category: 'color' }, value: '#CD7567' },
          700: { attributes: { category: 'color' }, value: '#B45544' },
        },
      },
      grey: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.grey.400}',
        },
        100: { attributes: { category: 'color' }, value: '#A5A5A5' },
        200: { attributes: { category: 'color' }, value: '#878787' },
        300: { attributes: { category: 'color' }, value: '#6A6A6A' },
        400: { attributes: { category: 'color' }, value: '#4C4C4C' },
        500: { attributes: { category: 'color' }, value: '#3D3D3D' },
        600: { attributes: { category: 'color' }, value: '#2E2E2E' },
        700: { attributes: { category: 'color' }, value: '#1E1E1E' },
        light: {
          100: { attributes: { category: 'color' }, value: '#E1E1E1' },
          200: { attributes: { category: 'color' }, value: '#C4C4C4' },
        },
      },
      primary: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.primary.400}',
        },
        50: { attributes: { category: 'color' }, value: '#E4ECFF' },
        100: { attributes: { category: 'color' }, value: '#D6DCFE' },
        200: { attributes: { category: 'color' }, value: '#99A9FE' },
        400: { attributes: { category: 'color' }, value: '#3354FD' },
        500: { attributes: { category: 'color' }, value: '#2843CA' },
        600: { attributes: { category: 'color' }, value: '#233AB1' },
      },
      warning: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.warning.400}',
        },
        400: { attributes: { category: 'color' }, value: '#E3A702' },
      },
      critical: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.critical.400}',
        },
        400: { attributes: { category: 'color' }, value: '#D51B06' },
      },
      disabled: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.disabled.400}',
        },
        400: { attributes: { category: 'color' }, value: '#D4D8DD' },
      },
      success: {
        DEFAULT: {
          attributes: { category: 'color' },
          value: '{color.base.success.400}',
        },
        400: { attributes: { category: 'color' }, value: '#00907F' },
      },
      white: { attributes: { category: 'color' }, value: '#FFFFFF' },
      black: { attributes: { category: 'color' }, value: '#000000' },
    },
  },
};
