"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// temp/index.ts
var temp_exports = {};
__export(temp_exports, {
  border: () => border,
  color: () => color,
  font: () => font,
  size: () => size,
  tailwind: () => tailwind
});
module.exports = __toCommonJS(temp_exports);
var border = {
  "width": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "DEFAULT": "0.0625rem"
  }
};
var color = {
  "transparent": "transparent",
  "inherit": "inherit",
  "current": "currentColor",
  "base": {
    "yellow": {
      "100": "#FEFEAC",
      "200": "#FDFD83",
      "300": "#FDFD59",
      "400": "#FCFC30",
      "500": "#CACA26",
      "600": "#99991D",
      "700": "#676713",
      "DEFAULT": "#FCFC30",
      "light": {
        "100": "#FFF7D1",
        "200": "#FFF4BB",
        "300": "#FFF0A4",
        "400": "#FFEC8D",
        "500": "#E0CE71",
        "600": "#C1AF55",
        "700": "#A29138",
        "DEFAULT": "#FFEC8D"
      }
    },
    "blue": {
      "100": "#B5BFFF",
      "200": "#909EFF",
      "300": "#6B7EFF",
      "400": "#465EFF",
      "500": "#384CD2",
      "600": "#2A3AA5",
      "700": "#1C2877",
      "800": "#E4ECFF",
      "DEFAULT": "#465EFF",
      "light": {
        "100": "#BBF1FE",
        "200": "#98EAFD",
        "300": "#76E3FD",
        "400": "#54DCFC",
        "500": "#43B6D2",
        "600": "#3391A7",
        "700": "#226B7D",
        "DEFAULT": "#54DCFC"
      }
    },
    "purple": {
      "100": "#C7BEE8",
      "200": "#AB9DDD",
      "300": "#8F7DD1",
      "400": "#735CC6",
      "500": "#5C4A9E",
      "600": "#453777",
      "700": "#2E254F",
      "DEFAULT": "#735CC6",
      "light": {
        "100": "#E5E2FF",
        "200": "#D7D3FF",
        "300": "#CAC5FF",
        "400": "#BDB6FF",
        "500": "#9A92E8",
        "600": "#776DD1",
        "700": "#5449BB",
        "DEFAULT": "#BDB6FF"
      }
    },
    "green": {
      "100": "#99F7EC",
      "200": "#66F3E3",
      "300": "#33EFD9",
      "400": "#00EBD0",
      "500": "#00BCA6",
      "600": "#008D7D",
      "700": "#005E53",
      "DEFAULT": "#00EBD0",
      "light": {
        "100": "#CDFFF7",
        "200": "#B5FFF2",
        "300": "#9CFFEE",
        "400": "#83FFEA",
        "500": "#69DECA",
        "600": "#4FBDAA",
        "700": "#349C8B",
        "DEFAULT": "#83FFEA"
      }
    },
    "pink": {
      "100": "#FDCAC6",
      "200": "#FBAFA9",
      "300": "#FA958D",
      "400": "#F97A70",
      "500": "#D4635A",
      "600": "#AF4C44",
      "700": "#89352F",
      "DEFAULT": "#F97A70",
      "light": {
        "100": "#FFE2DD",
        "200": "#FFD4CD",
        "300": "#FFC5BC",
        "400": "#FFB7AB",
        "500": "#E69689",
        "600": "#CD7567",
        "700": "#B45544",
        "DEFAULT": "#FFB7AB"
      }
    },
    "grey": {
      "100": "#A5A5A5",
      "200": "#878787",
      "300": "#6A6A6A",
      "400": "#4C4C4C",
      "500": "#3D3D3D",
      "600": "#2E2E2E",
      "700": "#1E1E1E",
      "DEFAULT": "#4C4C4C",
      "light": {
        "100": "#E1E1E1",
        "200": "#C4C4C4"
      }
    },
    "primary": {
      "50": "#E4ECFF",
      "100": "#D6DCFE",
      "200": "#99A9FE",
      "400": "#3354FD",
      "500": "#2843CA",
      "600": "#233AB1",
      "DEFAULT": "#3354FD"
    },
    "warning": {
      "400": "#E3A702",
      "DEFAULT": "#E3A702"
    },
    "critical": {
      "400": "#D51B06",
      "DEFAULT": "#D51B06"
    },
    "disabled": {
      "400": "#D4D8DD",
      "DEFAULT": "#D4D8DD"
    },
    "success": {
      "400": "#00907F",
      "DEFAULT": "#00907F"
    },
    "white": "#FFFFFF",
    "black": "#000000"
  }
};
var font = {
  "letterSpacing": {
    "6xl": "-0.1975rem",
    "5xl": "-0.09375rem",
    "4xl": "-0.0625rem",
    "3xl": "-0.025rem",
    "2xl": "-0.015625rem",
    "xl": "0.140625rem",
    "lg": "0rem",
    "md": "0rem",
    "sm": "0rem",
    "xs": "0rem"
  },
  "lineHeight": {
    "6xl": "6rem",
    "5xl": "3.625rem",
    "4xl": "2.6875rem",
    "3xl": "2.375rem",
    "2xl": "2.0625rem",
    "xl": "1.875rem",
    "lg": "1.625rem",
    "md": "1.5rem",
    "sm": "1.3125rem",
    "xs": "1.125rem"
  },
  "size": {
    "6xl": "6rem",
    "5xl": "3rem",
    "4xl": "2.25rem",
    "3xl": "2rem",
    "2xl": "1.75rem",
    "xl": "1.5rem",
    "lg": "1.125rem",
    "md": "1rem",
    "sm": "0.875rem",
    "xs": "0.75rem"
  },
  "family": {
    "inherit": "inherit",
    "title": [
      "InterTitulos",
      "sans-serif"
    ],
    "paragraph": [
      "InterTextos",
      "sans-serif"
    ]
  }
};
var size = {
  "breakpoints": {
    "lg": "90rem",
    "md": "45rem",
    "sm": "30rem"
  },
  "spacing": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "32": "2rem",
    "48": "3rem",
    "64": "4rem",
    "96": "6rem",
    "120": "7.5rem",
    "auto": "auto"
  },
  "sizing": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  }
};
var tailwind = {
  "colors": {
    "transparent": "transparent",
    "inherit": "inherit",
    "current": "currentColor",
    "base": {
      "yellow": {
        "100": "#FEFEAC",
        "200": "#FDFD83",
        "300": "#FDFD59",
        "400": "#FCFC30",
        "500": "#CACA26",
        "600": "#99991D",
        "700": "#676713",
        "DEFAULT": "#FCFC30",
        "light": {
          "100": "#FFF7D1",
          "200": "#FFF4BB",
          "300": "#FFF0A4",
          "400": "#FFEC8D",
          "500": "#E0CE71",
          "600": "#C1AF55",
          "700": "#A29138",
          "DEFAULT": "#FFEC8D"
        }
      },
      "blue": {
        "100": "#B5BFFF",
        "200": "#909EFF",
        "300": "#6B7EFF",
        "400": "#465EFF",
        "500": "#384CD2",
        "600": "#2A3AA5",
        "700": "#1C2877",
        "800": "#E4ECFF",
        "DEFAULT": "#465EFF",
        "light": {
          "100": "#BBF1FE",
          "200": "#98EAFD",
          "300": "#76E3FD",
          "400": "#54DCFC",
          "500": "#43B6D2",
          "600": "#3391A7",
          "700": "#226B7D",
          "DEFAULT": "#54DCFC"
        }
      },
      "purple": {
        "100": "#C7BEE8",
        "200": "#AB9DDD",
        "300": "#8F7DD1",
        "400": "#735CC6",
        "500": "#5C4A9E",
        "600": "#453777",
        "700": "#2E254F",
        "DEFAULT": "#735CC6",
        "light": {
          "100": "#E5E2FF",
          "200": "#D7D3FF",
          "300": "#CAC5FF",
          "400": "#BDB6FF",
          "500": "#9A92E8",
          "600": "#776DD1",
          "700": "#5449BB",
          "DEFAULT": "#BDB6FF"
        }
      },
      "green": {
        "100": "#99F7EC",
        "200": "#66F3E3",
        "300": "#33EFD9",
        "400": "#00EBD0",
        "500": "#00BCA6",
        "600": "#008D7D",
        "700": "#005E53",
        "DEFAULT": "#00EBD0",
        "light": {
          "100": "#CDFFF7",
          "200": "#B5FFF2",
          "300": "#9CFFEE",
          "400": "#83FFEA",
          "500": "#69DECA",
          "600": "#4FBDAA",
          "700": "#349C8B",
          "DEFAULT": "#83FFEA"
        }
      },
      "pink": {
        "100": "#FDCAC6",
        "200": "#FBAFA9",
        "300": "#FA958D",
        "400": "#F97A70",
        "500": "#D4635A",
        "600": "#AF4C44",
        "700": "#89352F",
        "DEFAULT": "#F97A70",
        "light": {
          "100": "#FFE2DD",
          "200": "#FFD4CD",
          "300": "#FFC5BC",
          "400": "#FFB7AB",
          "500": "#E69689",
          "600": "#CD7567",
          "700": "#B45544",
          "DEFAULT": "#FFB7AB"
        }
      },
      "grey": {
        "100": "#A5A5A5",
        "200": "#878787",
        "300": "#6A6A6A",
        "400": "#4C4C4C",
        "500": "#3D3D3D",
        "600": "#2E2E2E",
        "700": "#1E1E1E",
        "DEFAULT": "#4C4C4C",
        "light": {
          "100": "#E1E1E1",
          "200": "#C4C4C4"
        }
      },
      "primary": {
        "50": "#E4ECFF",
        "100": "#D6DCFE",
        "200": "#99A9FE",
        "400": "#3354FD",
        "500": "#2843CA",
        "600": "#233AB1",
        "DEFAULT": "#3354FD"
      },
      "warning": {
        "400": "#E3A702",
        "DEFAULT": "#E3A702"
      },
      "critical": {
        "400": "#D51B06",
        "DEFAULT": "#D51B06"
      },
      "disabled": {
        "400": "#D4D8DD",
        "DEFAULT": "#D4D8DD"
      },
      "success": {
        "400": "#00907F",
        "DEFAULT": "#00907F"
      },
      "white": "#FFFFFF",
      "black": "#000000"
    }
  },
  "width": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "maxWidth": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "minWidth": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "height": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "maxHeight": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "minHeight": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "inset": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "24": "1.5rem",
    "32": "2rem",
    "40": "2.5rem",
    "48": "3rem",
    "56": "3.5rem",
    "64": "4rem",
    "72": "4.5rem",
    "80": "5rem",
    "88": "5.5rem",
    "96": "6rem",
    "104": "6.5rem",
    "112": "7rem",
    "120": "7.5rem",
    "240": "15rem",
    "360": "22.5rem",
    "480": "30rem",
    "600": "37.5rem",
    "720": "45rem",
    "840": "52.5rem",
    "960": "60rem",
    "1080": "67.5rem",
    "1200": "75rem",
    "1320": "82.5rem",
    "1440": "90rem",
    "auto": "auto",
    "full": "100%",
    "half": "50%",
    "vh": "100vh",
    "vw": "100vw",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "spacing": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "16": "1rem",
    "32": "2rem",
    "48": "3rem",
    "64": "4rem",
    "96": "6rem",
    "120": "7.5rem",
    "auto": "auto"
  },
  "screens": {
    "lg": "90rem",
    "md": "45rem",
    "sm": "30rem"
  },
  "fontFamily": {
    "inherit": "inherit",
    "title": [
      "InterTitulos",
      "sans-serif"
    ],
    "paragraph": [
      "InterTextos",
      "sans-serif"
    ]
  },
  "letterSpacing": {
    "6xl": "-0.1975rem",
    "5xl": "-0.09375rem",
    "4xl": "-0.0625rem",
    "3xl": "-0.025rem",
    "2xl": "-0.015625rem",
    "xl": "0.140625rem",
    "lg": "0rem",
    "md": "0rem",
    "sm": "0rem",
    "xs": "0rem"
  },
  "borderWidth": {
    "0": "0rem",
    "1": "0.0625rem",
    "2": "0.125rem",
    "4": "0.25rem",
    "8": "0.5rem",
    "DEFAULT": "0.0625rem"
  },
  "fontSize": {
    "6xl": [
      "6rem",
      "6rem"
    ],
    "5xl": [
      "3rem",
      "3.625rem"
    ],
    "4xl": [
      "2.25rem",
      "2.6875rem"
    ],
    "3xl": [
      "2rem",
      "2.375rem"
    ],
    "2xl": [
      "1.75rem",
      "2.0625rem"
    ],
    "xl": [
      "1.5rem",
      "1.875rem"
    ],
    "lg": [
      "1.125rem",
      "1.625rem"
    ],
    "md": [
      "1rem",
      "1.5rem"
    ],
    "sm": [
      "0.875rem",
      "1.3125rem"
    ],
    "xs": [
      "0.75rem",
      "1.125rem"
    ]
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  border,
  color,
  font,
  size,
  tailwind
});
//# sourceMappingURL=index.js.map