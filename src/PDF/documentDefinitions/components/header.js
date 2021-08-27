import { tableHelper } from "../tables/tableHelpers";
import profile from "../../profileConfig";
import { optimarB64 } from "../../assets/optimar_base64";

export const header = {
  layout: tableHelper.singleRowColorLayout(
    profile.HEAD_FOOT_COLOR,
    profile.HEAD_FOOT_COLOR
  ),
  table: {
    headerRows: 1,
    widths: ["auto", "*"],
    body: [[{ image: optimarB64, width: profile.DOCUMENT_WIDTH * 0.2 }, {}]],
  },
};
