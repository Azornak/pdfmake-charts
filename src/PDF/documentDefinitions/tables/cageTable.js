import { tableHelper } from "./tableHelpers";

const header = (text) =>
  tableHelper.createTableHeaderText(text, { alignment: "center" });

const transformer = (column) =>
  tableHelper.createTableRowText(column, { alignment: "center" });

/**
 * Creats a table for cage data. It has 7 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
export default function createCageTable(tableData = []) {
  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );

  const table = {
    body: [
      [
        {
          ...header(""),
          colSpan: 4,
        },
        {},
        {},
        {},
        {
          ...header("System estimated"),
          colSpan: 3,
        },
        {},
        {},
      ],
      [
        header("From cage [nr]"),
        header("To RSW Tank [nr]"),
        header("Total Time [HH:MM:SS]"),
        header("Waiting [HH:MM:SS]"),
        header("Biomass [kg]"),
        header("Quantum [fish]"),
        header("Avg. Biomass [kg/fisk]"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table);
}
