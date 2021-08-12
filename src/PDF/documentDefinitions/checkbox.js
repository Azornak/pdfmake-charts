const backgroundColor = "#55D2E9";
const checkedColor = "#003B4A";

const checkbox = (extra = "") => {
  return `<svg width="18px" height="18px" viewBox="0 0 18 18"  class="block__element-svg"> <g troke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <rect class="block__element-svg-box" id="Rectangle" fill-opacity="0.699999988" fill="${backgroundColor}" x="0" y="0" width="18" height="18" rx="4"></rect>  ${extra}</g> </svg>`;
};

const check = `<path class="block__element-svg-mark" d="M5.18575355,13.9646304 L7.49404751,14.0589905 L15.1922897,5.50332644 C15.7464044,4.88749501 15.6963732,3.93906624 15.0805417,3.3849515 C14.4647103,2.83083677 13.5162815,2.88086804 12.9621668,3.49669947 L6.62426758,10.7719727 L4.69331232,8.3674268 C4.19131125,7.70842269 3.25013058,7.58114657 2.59112647,8.08314764 C1.93212235,8.58514871 1.80484623,9.52632937 2.3068473,10.1853335 L5.18575355,13.9646304 Z" id="Path-2" fill="${checkedColor}"></path> `;
export const checkBoxCheckedSVG = checkbox(check);
export const checkBoxSVG = checkbox();
