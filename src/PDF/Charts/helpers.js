/**
 * Generates a canvas positioned way outside the screen, appends it do the document,
 * and returns the element.
 * @returns returns a canvas html element
 */
export function generateCanvas() {
  const canvas = document.createElement("canvas");
  // canvas.style.position = "absolute";
  // canvas.style.top = "-3000px";

  document.body.appendChild(canvas);
  return canvas;
}

/**
 * Returns a default chartjs axis title config.
 * Titles are positioned at the end with black color.
 *
 * @param {string} title
 * @returns
 */
export function getTitleConfig(title) {
  return {
    display: true,
    color: "black",
    text: title,
    align: "end",
  };
}
