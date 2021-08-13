import { tableHelper } from "./tableHelpers";
/**
 * Creates a singl column comment table with a fixed header row with title:Comment, and
 * a single row with the provided comment text.
 * Returns the definiton object.
 * @param {string} commentText comment text to display
 * @returns comment table defintion object
 */
export default function createCommentBlock(commentText) {
  const body = [
    [tableHelper.createTableHeaderText("Comment")],
    [tableHelper.createTableRowText(commentText)],
  ];
  return tableHelper.baseDataTable({ body });
}
