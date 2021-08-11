const DOCUMENT_WIDTH = 555;
const CHAPTER_LINE_HEIGHT = 5;
const SUB_CHAPTER_LINE_HEIGHT = 3;
const DATA_POINT_LINE_HEIGHT = 1;
const SEPERATOR_LINE_COLOR = "rgb(85, 210, 233)";

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
      {
        text: "01-processing site",
        style: "header",
      },
      createSeperatorLine(CHAPTER_LINE_HEIGHT, 100),
      {
        layout: "lightHorizontalLines", // optional

        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
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
