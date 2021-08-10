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
