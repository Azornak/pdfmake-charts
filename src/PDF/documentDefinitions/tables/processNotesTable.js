import { tableHelper } from "./tableHelpers";

const transformer = (column, index) => {
  if (index < 2)
    return tableHelper.createTableRowText(column, { alignment: "center" });
  return tableHelper.createTableRowText(column);
};

/**
 * Creats a table for process notes. It has 3 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
export default function createProcessNotesTable(tableData = []) {
  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );
  const table = {
    widths: ["auto", "auto", "*"],
    body: [
      [
        tableHelper.createTableHeaderText("Work", { alignment: "center" }),
        tableHelper.createTableHeaderText("Data & Time", {
          alignment: "center",
        }),
        tableHelper.createTableHeaderText("Comment"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table);
}
