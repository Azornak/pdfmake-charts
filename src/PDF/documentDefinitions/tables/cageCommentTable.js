import { tableHelper } from "./tableHelpers";

const transformer = (column, index) => {
  if (index === 0) {
    return tableHelper.createTableRowText(column, { alignment: "center" });
  }
  return tableHelper.createTableRowText(column);
};

/**
 * Creats a table for cage comments. It has 2 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
export default function createCageCommentTable(tableData = []) {
  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );
  const table = {
    widths: ["auto", "*"],
    body: [
      [
        tableHelper.createTableHeaderText("Cage[nr]", { alignment: "center" }),
        tableHelper.createTableHeaderText("Comment"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table, 1);
}
