import { tableHelper } from "./tableHelpers";
const HISTOGRAM_HELPER_TABLE_HEADER_COLOR = "#309CAA";

const transformer = (column) => {
  return tableHelper.createTableRowText(column, { alignment: "center" });
};

/**
 * Creates a grapgh helper table to visualize value/label for
 * a histogram graph.
 * The provided object is in format 
 * {
 *  titles: [string, string,...]
    data: [ [string,string, ...], [string, string,...]]
 * }
 * @param {object} tableValues object of table data
 * @returns returns a table definition object
 */
export default function createGraphHelperTable(tableValues) {
  const { titles, data } = tableValues;
  const tableDataComponents = tableHelper.transformTableRowText(
    data,
    transformer
  );

  const headers = titles.map((title) => {
    return tableHelper.createTableHeaderText(title, {
      alignment: "center",
      fill: HISTOGRAM_HELPER_TABLE_HEADER_COLOR,
    });
  });
  const table = {
    widths: ["*", "*"],
    alignment: "center",
    body: [headers, ...tableDataComponents],
  };
  return tableHelper.baseColorTable(table);
}
