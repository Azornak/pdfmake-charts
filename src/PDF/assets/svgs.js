// Path for checkbox rectangle
const getCheckboxSVG = (fillColor, checkSvgPath = "") => {
  return `<svg width="18px" height="18px" viewBox="0 0 18 18"  class="block__element-svg"> <g troke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <rect class="block__element-svg-box" id="Rectangle" fill-opacity="0.699999988" fill="${fillColor}" x="0" y="0" width="18" height="18" rx="4"></rect>  ${checkSvgPath}</g> </svg>`;
};

// Path for checkmark
const checkPath = (fillColor) =>
  `<path class="block__element-svg-mark" d="M5.18575355,13.9646304 L7.49404751,14.0589905 L15.1922897,5.50332644 C15.7464044,4.88749501 15.6963732,3.93906624 15.0805417,3.3849515 C14.4647103,2.83083677 13.5162815,2.88086804 12.9621668,3.49669947 L6.62426758,10.7719727 L4.69331232,8.3674268 C4.19131125,7.70842269 3.25013058,7.58114657 2.59112647,8.08314764 C1.93212235,8.58514871 1.80484623,9.52632937 2.3068473,10.1853335 L5.18575355,13.9646304 Z" id="Path-2" fill="${fillColor}"></path> `;

/**
 * Returns an object with svg for checked, and unchecked checkbox.
 * The colors can be hex, rgb format, named  format > #000000 or rgb(0,0,0) or black
 * @param {string} fillColor color of the checkbox background in hex, rgb or named
 * @param {string} checkFillColor color of the checkbox checkmark in hex, rgb or named
 * @returns object with checked or unchecked checkbox svgs
 */
export function checkboxSVG(fillColor, checkFillColor) {
  return {
    checked: getCheckboxSVG(fillColor, checkPath(checkFillColor)),
    unchecked: getCheckboxSVG(fillColor),
  };
}

/**
 * Creates an svg line with provided width, height and color.
 * The colors can be hex, rgb format, named  format > #000000 or rgb(0,0,0) or black
 * @param {number} width width of the line
 * @param {number} height height of the line
 * @param {string} color color of the line in hex, rgb or named format
 * @returns svg line with defined width, height and color
 */
export function seperatorLineSVG(width, height, color) {
  return `<svg width="${width}" height="${
    height + 10
  }"> <rect y="5" width="100%" height="${height}" style="fill:${color};" /> </svg>`;
}
