import { checkBoxCheckedSVG, checkBoxSVG } from "./checkbox";

const DOCUMENT_WIDTH = 555;
const CHAPTER_LINE_HEIGHT = 5;
const SUB_CHAPTER_LINE_HEIGHT = 3;
const DATA_POINT_LINE_HEIGHT = 0.5;
const SEPERATOR_LINE_COLOR = "#55D2E9";
//
const HISTOGRAM_HELPER_TABLE_HEADER_COLOR = "#309CAA";
const HISTOGRAM_HELPER_TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
const HISTOGRAM_HELPER_TABLE_N1_ROW_COLOR = "#E9EBF5";
const HISTOGRAM_HELPER_TABLE_N2_ROW_COLOR = "#CFD5EA";
const HISTOGRAM_HELPER_TABLE_BORDER_COLOR = "#FFF";
//
const DATA_TABLE_HEADER_COLOR = "#7F7F7F";
const DATA_TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
const DATA_TABLE_ROW_COLOR = "#F2F2F2";
const DATA_TABLE_BORDER_COLOR = "#FFF";
//
const TITLE_MARGINS = [1, 15, 0, 3];
const TABLE_MARGINS = [0, 15, 0, 0];

function createHeader(text) {
  return { text, style: "header", margin: TITLE_MARGINS };
}
function createSubHeader(text) {
  return { text, style: "subHeader", margin: TITLE_MARGINS };
}
function createDataPointHeader(text) {
  return { text, style: "dataPointHeader", margin: TITLE_MARGINS };
}
/**
 * Breaks the page before this definition
 * @returns text definition object with break before
 */
function breakPage() {
  return { text: "", pageBreak: "before" };
}

/**
 * Creates a SVG line component with provided height and width of document.
 * The default width is 100% of the document.
 * Values below 1 or above 100 will be converted to 100%
 * @param {number} height height of the line
 * @param {number} percentWidth percentage of document width 1-100
 * @returns returns an svg line component definition
 */
function createSeperatorLine(height, percentWidth = 100) {
  if (percentWidth > 100 || percentWidth < 1) percentWidth = 100;
  const width = (percentWidth / 100) * DOCUMENT_WIDTH;
  return {
    svg: `<svg width="${width}" height="${
      height + 10
    }"> <rect y="5" width="100%" height="${height}" style="fill:${SEPERATOR_LINE_COLOR};" /> </svg>`,
  };
}

/**
 * Creates a chapter seperator component definition
 * It contains a text element and a seperator line.
 * @param {string} chapterTitle the title of the chapter
 * @returns chapter seperator definition object
 */
function createChapterSeperator(chapterTitle) {
  return {
    stack: [
      createHeader(chapterTitle),
      createSeperatorLine(CHAPTER_LINE_HEIGHT, 100),
    ],
  };
}

/**
 * Creates a subchapter seperator component definition
 * It contains a text element and a seperator line.
 * @param {string} subChapterTitle the title of the subchapter
 * @returns subchapter seperator definition object
 */
function createSubChapterSeperator(subChapterTitle, width = 100) {
  return {
    stack: [
      createSubHeader(subChapterTitle),
      createSeperatorLine(SUB_CHAPTER_LINE_HEIGHT, 100),
    ],
  };
}

/**
 * Creates a datapoint seperator component definition
 * It contains a text element and a seperator line.
 * @param {string} dataPointTitle the title of the data point
 * @returns datapoint seperator definition object
 */
function createDataPointSeperator(dataPointTitle, width = 100) {
  return {
    stack: [
      createDataPointHeader(dataPointTitle),
      createSeperatorLine(DATA_POINT_LINE_HEIGHT, width),
    ],
  };
}

/**
 * Creates a datapoint definition object with a title , seperator line and component definition bellow (e.g text, image etc).
 * @param {object} dataPointConfig datapoint object with title and
 * @returns returns datapoint definition object
 */
function createDataPointComponent(dataPointConfig) {
  const { title, component } = dataPointConfig;
  return {
    stack: [
      createDataPointHeader(title),
      createSeperatorLine(DATA_POINT_LINE_HEIGHT, 30),
      component,
    ],
  };
}

function createDataPointTextComponent(textPointConfig) {
  const component = { text: textPointConfig.content, margin: [1, 3, 0, 3] };
  return createDataPointComponent({ title: textPointConfig.title, component });
}

/**
 * Creates a histogram graph definition object.
 * It contains a title, a graph image and a helper table for the graph.
 * @param {object} graphConfig
 * @returns histogram definition object
 */
function createHistogramGraphComponents(graphConfig) {
  const { graph, title, table } = graphConfig;

  const contentTable = {
    layout: "noBorders",
    table: {
      headerRows: 1,
      widths: ["60%", "*", "25%"],
      body: [
        [
          { image: graph, width: DOCUMENT_WIDTH * 0.6 },
          {},
          createGraphHelperTable(table),
        ],
      ],
    },
  };

  return [createDataPointSeperator(title), contentTable];
}

/**
 * Creates a image definition object.
 * It contains a title and an image
 * @param {object} imageConfig
 * @returns image definition object
 */
function createImageComponent(imageConfig) {
  const { image, title } = imageConfig;

  return {
    stack: [createDataPointSeperator(title), { image, width: DOCUMENT_WIDTH }],
  };
}

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
function createGraphHelperTable(tableValues) {
  const { titles, data } = tableValues;
  console.log(data);
  const headers = titles.map((title) => {
    return {
      border: [true, false, true, false],
      fillColor: HISTOGRAM_HELPER_TABLE_HEADER_COLOR,
      text: {
        text: title,
        color: HISTOGRAM_HELPER_TABLE_HEADER_TEXT_COLOR,
        alignment: "center",
      },
    };
  });
  return {
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        return rowIndex % 2 === 0
          ? HISTOGRAM_HELPER_TABLE_N1_ROW_COLOR
          : HISTOGRAM_HELPER_TABLE_N2_ROW_COLOR;
      },
      hLineWidth: function (i, node) {
        return i === 1 ? 2 : 0;
      },
      vLineWidth: function (i, node) {
        return 2;
      },
      hLineColor: function (i, node) {
        return HISTOGRAM_HELPER_TABLE_BORDER_COLOR;
      },
      vLineColor: function (i, node) {
        return HISTOGRAM_HELPER_TABLE_BORDER_COLOR;
      },
    },

    table: {
      headerRows: 1,
      widths: ["*", "*"],
      alignment: "center",
      body: [headers, ...data],
    },
  };
}

/**
 * Creats a table with checkboxes and label text.
 * If a value is checked a checked checkbox is displayed, else an empty checkbox.
 *
 * Format:
 * [{checked: boolean, label: string }]
 * @param {object} checkboxConfig checkboxes to create
 * @returns table of checkboxes definition object
 */
function createCheckboxesComponent(checkboxConfig) {
  const checkboxes = [];

  for (const checkItem of checkboxConfig) {
    checkboxes.push(
      { svg: checkItem.checked ? checkBoxCheckedSVG : checkBoxSVG },
      { text: checkItem.label }
    );
  }

  return {
    layout: "noBorders",
    table: {
      headerRows: 0,
      body: [checkboxes],
    },
  };
}

function createCheckboxDataPoint(checkboxDataPointConfig) {
  const { title, checkboxes } = checkboxDataPointConfig;
  const component = createCheckboxesComponent(checkboxes);
  return createDataPointComponent({ title, component });
}

function createTableHeaderText(text, alignment = "left") {
  return {
    text,
    style: "tableHeader",
    alignment,
    color: DATA_TABLE_HEADER_TEXT_COLOR,
    margin: [2, 3, 2, 3],
  };
}
function createTableBodyText(text, alignment = "left") {
  return {
    text: text,
    alignment,
    margin: [2, 3, 2, 3],
  };
}

/**
 * Creates a singl column comment table with a fixed header row with title:Comment, and
 * a single row with the provided comment text.
 * Returns the definiton object.
 * @param {string} commentText comment text to display
 * @returns comment table defintion object
 */
function createCommentBlock(commentText) {
  return {
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        if (rowIndex < 1) return DATA_TABLE_HEADER_COLOR;
        return DATA_TABLE_ROW_COLOR;
      },
      hLineWidth: function (i, node) {
        return i === 1 ? 2 : 0;
      },
      vLineWidth: function (i, node) {
        return 2;
      },
      hLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
      vLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
    },
    margin: TABLE_MARGINS,
    table: {
      headerRows: 1,
      body: [
        [createTableHeaderText("Comment")],
        [createTableBodyText(commentText)],
      ],
    },
  };
}

/**
 * Creats a table for throw data. It has 10 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createThrowTable(tableData = []) {
  const tableDataComponents = [];
  if (tableData.length === 0) {
    return { text: "No data for throw table" };
  } else {
    for (const row of tableData) {
      const newRow = row.map((column) => {
        return createTableBodyText(column, "center");
      });
      tableDataComponents.push(newRow);
    }
  }
  return {
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        if (rowIndex < 2) return DATA_TABLE_HEADER_COLOR;
        return DATA_TABLE_ROW_COLOR;
      },
      hLineWidth: function (i, node) {
        return i === 1 ? 2 : 0;
      },
      vLineWidth: function (i, node) {
        return 2;
      },
      hLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
      vLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
    },
    margin: TABLE_MARGINS,
    table: {
      headerRows: 2,
      body: [
        [
          {
            ...createTableHeaderText("", "center"),
            colSpan: 6,
          },
          {},
          {},
          {},
          {},
          {},
          {
            ...createTableHeaderText("System estimated", "center"),
            colSpan: 4,
          },
          {},
          {},
          {},
        ],
        [
          createTableHeaderText("Cage [nr]", "center"),
          createTableHeaderText("Throw [nr]", "center"),
          createTableHeaderText("Tool type", "center"),
          createTableHeaderText("Start [HH:MM]", "center"),
          createTableHeaderText("Stop [HH:MM]", "center"),
          createTableHeaderText("Time", "center"),
          createTableHeaderText("Pump speed [rpm]", "center"),
          createTableHeaderText("Biomass [kg]", "center"),
          createTableHeaderText("Quantu m [fish]", "center"),
          createTableHeaderText("Efficiency [fish/min]", "center"),
        ],
        ...tableDataComponents,
      ],
    },
  };
}

/**
 * Creats a table for cage data. It has 7 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createCageTable(tableData = []) {
  const tableDataComponents = [];
  if (tableData.length === 0) {
    return { text: "No data for cage table" };
  } else {
    for (const row of tableData) {
      const newRow = row.map((column) => {
        return createTableBodyText(column, "center");
      });
      tableDataComponents.push(newRow);
    }
  }
  return {
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        if (rowIndex < 2) return DATA_TABLE_HEADER_COLOR;
        return DATA_TABLE_ROW_COLOR;
      },
      hLineWidth: function (i, node) {
        return i === 1 ? 2 : 0;
      },
      vLineWidth: function (i, node) {
        return 2;
      },
      hLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
      vLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
    },
    margin: TABLE_MARGINS,
    table: {
      headerRows: 2,
      body: [
        [
          {
            ...createTableHeaderText("", "center"),
            colSpan: 4,
          },
          {},
          {},
          {},
          {
            ...createTableHeaderText("System estimated", "center"),
            colSpan: 3,
          },
          {},
          {},
        ],
        [
          createTableHeaderText("From cage [nr]", "center"),
          createTableHeaderText("To RSW Tank [nr]", "center"),
          createTableHeaderText("Total Time [HH:MM:SS]", "center"),
          createTableHeaderText("Waiting [HH:MM:SS]", "center"),
          createTableHeaderText("Biomass [kg]", "center"),
          createTableHeaderText("Quantum [fish]", "center"),
          createTableHeaderText("Avg. Biomass [kg/fisk]", "center"),
        ],
        ...tableDataComponents,
      ],
    },
  };
}

/**
 * Creats a table for cage comments. It has 2 columns for each row.
 * @param {array} tableData values for the data rows
 * @returns table definition object
 */
function createCageCommentTable(tableData = []) {
  const tableDataComponents = [];
  if (tableData.length === 0) {
    return { text: "No data for cage comment table" };
  } else {
    for (const row of tableData) {
      const newRow = row.map((column, index) => {
        if (index === 0) return createTableBodyText(column, "center");
        return createTableBodyText(column);
      });
      tableDataComponents.push(newRow);
    }
  }
  return {
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        if (rowIndex < 1) return DATA_TABLE_HEADER_COLOR;
        return DATA_TABLE_ROW_COLOR;
      },
      hLineWidth: function (i, node) {
        return i === 1 ? 2 : 0;
      },
      vLineWidth: function (i, node) {
        return 2;
      },
      hLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
      vLineColor: function (i, node) {
        return DATA_TABLE_BORDER_COLOR;
      },
    },
    margin: TABLE_MARGINS,
    table: {
      headerRows: 1,
      widths: ["auto", "*"],
      body: [
        [
          createTableHeaderText("Cage[nr]", "center"),
          createTableHeaderText("Comment"),
        ],
        ...tableDataComponents,
      ],
    },
  };
}
        ],
        ...tableDataComponents,
      ],
    },
  };
}

var docDefinition = (data) => {
  console.dir(data);
  return {
    pageSize: "A4",
    pageMargins: [20, 20, 20, 20],
    styles: {
      header: {
        bold: true,
      },
      subHeader: {
        bold: false,
      },
      dataPointHeader: {
        bold: false,
      },
    },
    content: [
      { text: "-------- COMPONENTS" },
      createCheckboxesComponent([
        { checked: true, label: "yes" },
        { checked: false, label: "no" },
        { checked: true, label: "absolutely" },
      ]),
      createSeperatorLine(CHAPTER_LINE_HEIGHT, 100),
      createSeperatorLine(SUB_CHAPTER_LINE_HEIGHT, 100),
      createSeperatorLine(DATA_POINT_LINE_HEIGHT, 100),
      createChapterSeperator("01-Main section"),
      createSubChapterSeperator("01.01-Subsection"),
      createDataPointSeperator("A datapoint seperator"),
      createDataPointTextComponent({ title: "Process", content: "100kg" }),
      createCageTable([
        ["1", "1-3", "22:30", "22:30", "12345", "1234567", "12.3"],
        ["1", "1-3", "22:30", "22:30", "12345", "1234567", "12.3"],
      ]),
      createCageCommentTable([
        ["1", "abcdef"],
        ["1", "abcdef"],
        ["1", "abcdef"],
      ]),
      { text: "-------- END OF COMPONENTS", margin: [0, 0, 0, 30] },
      createChapterSeperator("01-Processing site"),
      {
        layout: "noBorders",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],

          body: [
            [
              createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
            ],
            [
              createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
              createDataPointTextComponent({
                title: "Process",
                content: "100kg",
              }),
            ],
          ],
        },
      },
      ...createHistogramGraphComponents({
        title: "RSW - temperatures",
        graph: data.barChart1,
        table: {
          titles: ["size", "qty"],
          data: [
            ["1", "2"],
            ["3", "4"],
            ["3", "2"],
          ],
        },
      }),
      breakPage(),
      createImageComponent({
        title: "A process overview",
        image: data.lineChart1,
      }),
      createCheckboxDataPoint({
        title: "Blood water delivered",
        checkboxes: [
          { checked: true, label: "yes" },
          { checked: false, label: "no" },
        ],
      }),
    ],
  };
};

export default docDefinition;
