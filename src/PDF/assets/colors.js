/**
 * Optimar color palette
 * As described in: https://brandpad.io/optimar - Color codes.
 * Listed in order as displayed in document
 */
export const optimarColorPalette = {
  primaryDark: "#003B4A",
  primaryLight: "#9FCFCA",
  primaryLogo: "#4A9DA5",
  secondaryDark: "#016877",
  secondaryHighlight: "#FED925",
  secondaryBright: "#05B0A5",
  secondaryLight: "#A5E5D9",
  black: "#FFFFFF",
  white: "#000000",
};

/**
 * Gets a color from optimar color palette.
 * There are 7 colors, index from 0-6.
 * Values outside range returns the reminder.
 * @param {number} i
 */
export function getColorFromPalette(i) {
  if (i < 0) {
    i *= -1;
  }
  const values = Object.values(optimarColorPalette);

  if (i > values.length - 1) {
    i = i % values.length;
  }
  return values[i];
}
