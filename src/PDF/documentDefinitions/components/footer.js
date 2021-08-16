import { tableHelper } from "../tables/tableHelpers";
import profile from "../../profileConfig";
import { fishHandlingB64 } from "../../assets/fish_handling_base64";

export const footer = {
  layout: tableHelper.singleRowColorLayout(
    profile.HEAD_FOOT_COLOR,
    profile.HEAD_FOOT_COLOR
  ),
  table: {
    headerRows: 1,
    widths: ["auto", "*", "auto"],
    body: [
      [
        { image: fishHandlingB64, width: profile.DOCUMENT_WIDTH * 0.15 },
        {},
        { image: fishHandlingB64, width: profile.DOCUMENT_WIDTH * 0.15 },
      ],
    ],
  },
};
