const HISTOGRAM_HELPER_TABLE_N1_ROW_COLOR = "#E9EBF5";
const HISTOGRAM_HELPER_TABLE_N2_ROW_COLOR = "#CFD5EA";
const DATA_TABLE_ROW_COLOR = "#F2F2F2";
const TABLE_MARGINS = [0, 15, 0, 0];

function standardLayout(borderColor) {
  return {
    hLineWidth: function (i, node) {
      return 2;
    },
    vLineWidth: function (i, node) {
      return 2;
    },
    hLineColor: function (i, node) {
      return borderColor;
    },
    vLineColor: function (i, node) {
      return borderColor;
    },
  };
}

function alternateFill(firstFillColor, secondFillColor) {
  return {
    fillColor: function (rowIndex, node, columnIndex) {
      return rowIndex % 2 === 0 ? firstFillColor : secondFillColor;
    },
  };
}

function singleFill(fillColor) {
  return {
    fillColor: function (rowIndex, node, columnIndex) {
      return fillColor;
    },
  };
}

/**
 * Creates a table layout for altering colored tables rows.
 * @param {string} firstRowColor color of the even rows in the table hex, rgb, named
 * @param {string} secondRowColor color of the odd rows in the table hex, rgb, named
 * @param {*} borderColor color of the borders in the table hex, rgb, named
 * @returns table layout helper functions
 */
function alternateRowColorLayout(
  firstRowColor,
  secondRowColor,
  borderColor = "#FFFFFF"
) {
  return {
    ...standardLayout(borderColor),
    ...alternateFill(firstRowColor, secondRowColor),
  };
}

/**
 * Creates a table layout for single colored tables rows.
 * @param {string} rowColor color of the rows in the table hex, rgb, named
 * @param {*} borderColor color of the borders in the table hex, rgb, named
 * @returns table layout helper functions
 */
function singleRowColorLayout(rowColor, borderColor = "#FFFFFF") {
  return {
    ...standardLayout(borderColor),
    ...singleFill(rowColor),
  };
}

/**
 * Creates a text object definition with the provided text.
 * It has style tableHeader.
 * Config can adjust alignment, and background fill color
 * @param {string} text header text to display
 * @param {object} config text configuration
 * @returns header text definition object
 */
function createTableHeaderText(
  text = "",
  { alignment = "left", fill = "#7F7F7F" } = {}
) {
  return {
    text,
    fillColor: fill,
    style: "tableHeader",
    alignment,
  };
}

/**
 * Creates a text object definition with the provided text.
 * It has style tableRow.
 * Config can adjust alignment
 * @param {string} text row text to display
 * @param {object} config text configuration
 * @returns row text definition object
 */
function createTableRowText(text = "", { alignment = "left" } = {}) {
  return {
    text: text,
    style: "tableRow",
    alignment,
  };
}

/**
 * Creates a table definition ojbject with altering row colors.
 * @param {object} table a table definition object
 * @returns a table with data table layout (altering row colors)
 */
function baseColorTable(table) {
  return {
    layout: tableHelper.alternateRowColorLayout(
      HISTOGRAM_HELPER_TABLE_N1_ROW_COLOR,
      HISTOGRAM_HELPER_TABLE_N2_ROW_COLOR
    ),
    margin: TABLE_MARGINS,
    unbreakable: true,
    table: {
      headerRows: 1,
      ...table,
    },
  };
}

/**
 * Creates a table definition ojbject with signle colored rows.
 * @param {object} table a table definition object
 * @returns a table with data table layout (single colored rows)
 */
function baseDataTable(table) {
  return {
    layout: tableHelper.singleRowColorLayout(DATA_TABLE_ROW_COLOR),
    margin: TABLE_MARGINS,
    unbreakable: true,
    table: {
      headerRows: 1,
      ...table,
    },
  };
}

/**
 * Iterates over the provided rows to transform the text values into new text objects for displying
 * in the table.
 * The rows array must be a 2d array [[],[]].
 * The transformer method accepts a column value(text from a column in rows data array), and index which is the nth column in a row.
 * @param {array} rows data array 2d array
 * @param {function} transformer function that returns the text object for the row column
 * @returns a 2d array with transformed text to new text objects returned by the transformer
 */
function transformTableRowText(rows, transformer) {
  const newTableRows = [];
  if (rows.length === 0) {
    return { text: "No data for table" };
  } else {
    for (const row of rows) {
      const newRow = row.map((column, index) => {
        return transformer(column, index);
      });
      newTableRows.push(newRow);
    }
  }
  return newTableRows;
}

export const tableHelper = {
  singleRowColorLayout,
  alternateRowColorLayout,
  createTableRowText,
  createTableHeaderText,
  baseDataTable,
  baseColorTable,
  transformTableRowText,
};
