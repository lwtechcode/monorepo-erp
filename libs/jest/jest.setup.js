require(`@testing-library/jest-dom/extend-expect`);

const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

/*
  Error: Not implemented: window.computedStyle(elt, pseudoElt)
  https://github.com/nickcolley/jest-axe/issues/147
*/
beforeAll(() => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt, pseudoElt) =>
    getComputedStyle(elt, pseudoElt);
});
