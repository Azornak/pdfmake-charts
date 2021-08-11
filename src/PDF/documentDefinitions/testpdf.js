const DOCUMENT_WIDTH = 555;
const CHAPTER_LINE_HEIGHT = 5;
const SUB_CHAPTER_LINE_HEIGHT = 3;
const DATA_POINT_LINE_HEIGHT = 0.5;
const SEPERATOR_LINE_COLOR = "rgb(85, 210, 233)";

const HISTOGRAM_HELPER_TABLE_HEADER_COLOR = "#309CAA";
const HISTOGRAM_HELPER_TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
const HISTOGRAM_HELPER_TABLE_N1_ROW_COLOR = "#E9EBF5";
const HISTOGRAM_HELPER_TABLE_N2_ROW_COLOR = "#CFD5EA";
const HISTOGRAM_HELPER_TABLE_BORDER_COLOR = "#FFF";

const TITLE_MARGINS = [1, 15, 0, 3];

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
 * Creates a datapoint definition object with a title , seperator line and value field bellow.
 * @param {object} dataPointConfig datapoint object with title and
 * @returns returns datapoint definition object
 */
function createDataPointComponent(dataPointConfig) {
  return {
    stack: [
      createDataPointHeader("title"),
      createSeperatorLine(DATA_POINT_LINE_HEIGHT, 30),
      { text: "subtitle", margin: [1, 3, 0, 3] },
    ],
  };
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
      createSeperatorLine(CHAPTER_LINE_HEIGHT, 100),
      createSeperatorLine(SUB_CHAPTER_LINE_HEIGHT, 100),
      createSeperatorLine(DATA_POINT_LINE_HEIGHT, 100),
      createChapterSeperator("01-Main section"),
      createSubChapterSeperator("01.01-Subsection"),
      createDataPointSeperator("A datapoint seperator"),
      createDataPointComponent({}),
      { text: "-------- END OF COMPONENTS", margin: [0, 0, 0, 30] },
      createChapterSeperator("01-Processing site"),
      {
        layout: "noBorders",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],

          body: [
            [
              createDataPointComponent({}),
              createDataPointComponent({}),
              createDataPointComponent({}),
            ],
            [
              createDataPointComponent({}),
              createDataPointComponent({}),
              createDataPointComponent({}),
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
      {
        layout: "lightHorizontalLines",

        table: {
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],

          body: [
            [
              data.heading[0],
              data.heading[1],
              data.heading[2],
              data.heading[3],
            ],
            ["Value 1", "Value 1", "Value 3", "Value 4"],
            [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"],
          ],
        },
      },
    ],
  };
};

export default docDefinition;
