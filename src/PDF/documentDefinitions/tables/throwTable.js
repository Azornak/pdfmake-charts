import { tableHelper } from "./tableHelpers";

const header = (text) =>
  tableHelper.createTableHeaderText(text, { alignment: "center" });

const transformer = (column) =>
  tableHelper.createTableRowText(column, { alignment: "center" });

/**
 * Creats a table for throw data. It has 10 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
export default function createThrowTable(tableData = []) {
  const tableDataComponents = tableHelper.transformTableRowText(
    tableData,
    transformer
  );

  const table = {
    headerRows: 2,
    body: [
      [
        {
          ...header(""),
          colSpan: 6,
        },
        {},
        {},
        {},
        {},
        {},
        {
          ...header("System estimated"),
          colSpan: 4,
        },
        {},
        {},
        {},
      ],
      [
        header("Cage [nr]"),
        header("Throw [nr]"),
        header("Tool type"),
        header("Start [HH:MM]"),
        header("Stop [HH:MM]"),
        header("Time [HH:MM]"),
        header("Pump Speed [rpm]"),
        header("Biomass [kg]"),
        header("Quantum [fish]"),
        header("Efficiency [fish/min]"),
      ],
      ...tableDataComponents,
    ],
  };
  return tableHelper.baseDataTable(table);
}
